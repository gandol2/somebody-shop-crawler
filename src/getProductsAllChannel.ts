import Dotenv from "dotenv";
Dotenv.config();
import prisma from "../libs/prismadb.js";
import dayjs from "dayjs";
import { getChannelIDbyENV } from "../libs/channelIdHelper.js";
import { getProducts } from "../libs/naverApi.js";
import _, { update } from "lodash";
import { Prisma, Product, Sale } from "@prisma/client";

var indexChannelID = getChannelIDbyENV();
// indexChannelID = 100174726; // 다이슨코리아
// indexChannelID = 101192901; // 미슐램
// indexChannelID = 100001590; // 없는채널

let start = dayjs();

//* ================================ main function
async function main() {
  if (!indexChannelID) {
    console.log(`[상품번호없음] ${process.env.STORE_NO_START}`);
    process.exit(1);
  }

  const productResponse = await getProducts(indexChannelID, "POPULAR", 5);

  if (
    !productResponse ||
    !productResponse.simpleProducts ||
    1 > productResponse.simpleProducts.length
  ) {
    console.log(`[판매상품없음] ${process.env.STORE_NO_START}`);
    process.exit(1);
  }

  const channel = productResponse.simpleProducts[0].channel;
  //^ 채널정보 업데이트
  await prisma.channel.upsert({
    where: {
      channelNo: channel.channelNo.toString(),
    },
    create: {
      channelNo: channel.channelNo.toString(),
      accountNo: channel.accountNo.toString(),
      accountId: channel.accountId,
      channelName: channel.channelName,
      totalCount: productResponse.totalCount,
    },
    update: {
      // channelNo: channel.channelNo.toString(),
      accountNo: channel.accountNo.toString(),
      accountId: channel.accountId,
      channelName: channel.channelName,
      totalCount: productResponse.totalCount,
    },
  });

  //^ 등록상품 필터링
  const filterProducts = productResponse.simpleProducts.filter((product) => {
    const price = product.benefitsView.discountedSalePrice;
    const saleCount3D = product.saleAmount.recentSaleCount;
    const saleCount6M = product.saleAmount.cumulationSaleCount;

    const saleAmount3D = price * saleCount3D;
    const saleAmount6M = price * saleCount6M;

    if (300000 <= saleAmount3D || 6000000 <= saleAmount6M) {
      return product;
    }
  });

  //^ 카테고리 등록 OFF
  if (false) {
    const categories = _.uniqBy(
      filterProducts.map((product) => product.category),
      (ele) => ele.categoryId
    );
    if (0 < categories.length) {
      await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
      });
    }
    // console.log(categories);
  }

  for (const product of filterProducts) {
    const price = product.benefitsView.discountedSalePrice;
    const saleCount3D = product.saleAmount.recentSaleCount;
    const saleCount6M = product.saleAmount.cumulationSaleCount;

    const saleAmount3D = price * saleCount3D;
    const saleAmount6M = price * saleCount6M;

    await prisma.product.upsert({
      where: {
        productId: product.id.toString(),
      },
      create: {
        productId: product.id.toString(),
        productName: product.name,
        imageUrl: product.representativeImageUrl,
        productStatusType: product.productStatusType,
        manufacturerName: product.naverShoppingSearchInfo?.manufacturerName,
        brandName: product.naverShoppingSearchInfo?.brandName!,
        modelName: product.naverShoppingSearchInfo?.modelName!,
        totalReviewCount: product.reviewAmount.totalReviewCount,
        averageReviewScore: product.reviewAmount.averageReviewScore,
        displayable: product.displayable,
        productDeliveryFee: product.productDeliveryInfo?.baseFee,
        channelNo: product.channel.channelNo.toString(),
        categoryId: product.category.categoryId,
      },
      update: {
        //   productId: product.id,
        productName: product.name,
        imageUrl: product.representativeImageUrl,
        productStatusType: product.productStatusType,
        manufacturerName: product.naverShoppingSearchInfo?.manufacturerName!,
        brandName: product.naverShoppingSearchInfo?.brandName!,
        modelName: product.naverShoppingSearchInfo?.modelName!,
        totalReviewCount: product.reviewAmount.totalReviewCount,
        averageReviewScore: product.reviewAmount.averageReviewScore,
        displayable: product.displayable,
        productDeliveryFee: product.productDeliveryInfo?.baseFee,
        //   channelNo: product.channel.channelNo,
        categoryId: product.category.categoryId,
      },
    });
  }

  const productIds = filterProducts.map((product) => product.id.toString());
  const day3ago = dayjs().subtract(3, "day");
  //^ 3일내에 수집된 상품 가져오기
  const salesDay3Ago = await prisma.sale.findMany({
    where: {
      AND: [
        {
          createAt: {
            gt: day3ago.toDate(),
          },
        },
      ],
      OR: productIds.map((ele) => ({ productId: ele })),
    },
    select: {
      id: true,
      productId: true,
      channelNo: true,
    },
  });

  const salesDay3AgoProductIds = salesDay3Ago.map((ele) => ele.productId);

  // console.log(salesDay3Ago);

  const sales = filterProducts.map((product) => {
    const price = product.benefitsView.discountedSalePrice;
    const saleCount3D = product.saleAmount.recentSaleCount;
    const saleCount6M = product.saleAmount.cumulationSaleCount;

    const saleAmount3D = price * saleCount3D;
    const saleAmount6M = price * saleCount6M;

    const data: Prisma.SaleCreateManyInput = {
      price,
      saleCount3D,
      saleCount6M,
      saleAmount3D,
      saleAmount6M,
      channelNo: product.channel.channelNo.toString(),
      productId: product.id.toString(),
    };

    // await prisma.sale.create({ data: { ...data } });

    return data;
  });

  const updateSales = salesDay3Ago.map((ele) => {
    const filter = sales
      .filter((sale) => sale.productId === ele.productId)
      .shift();
    if (filter) {
      return { ...filter, ...ele };
    }
  });
  // console.log(updateSales);

  let updateSalesResultCount = 0;

  for (const updateSale of updateSales) {
    if (updateSale && updateSale.id) {
      await prisma.sale.update({
        where: { id: updateSale.id },
        data: {
          price: updateSale.price,
          saleCount3D: updateSale.saleCount3D,
          saleCount6M: updateSale.saleCount6M,
          saleAmount3D: updateSale.saleAmount3D,
          saleAmount6M: updateSale.saleAmount6M,
        },
      });
      updateSalesResultCount += 1;
    }
  }

  const createSales = sales.filter((ele) => {
    if (ele.productId) {
      if (!salesDay3AgoProductIds.includes(ele.productId)) {
        return ele;
      }
    }
  });

  const createSalesResult = await prisma.sale.createMany({ data: createSales });

  console.log(
    `[등록성공] ${channel.channelName}(${channel.channelNo}) 전체:${productResponse.totalCount} / 고매출:${sales.length} / 등록:${createSalesResult.count} / 변경:${updateSalesResultCount}`
  );

  //   console.log(productResponse);
}

//
//
//
//
//
//
//
//
//* ================================ run()
main()
  .then(async () => {})
  .catch((e) => {
    console.log("[에러발생-1]");
    console.log(e);
  })
  .finally(async () => {
    // console.log(
    //   `[완료] 실행시간 : ${dayjs()
    //     .diff(start, "millisecond")
    //     .toLocaleString()}ms`
    // );
    await prisma.$disconnect();
    process.exit(1);
  });
