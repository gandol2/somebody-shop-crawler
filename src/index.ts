import path from "path";
import prisma from "../libs/prismadb.js";
import fs from "fs";
import { serverPing } from "../libs/db/serverHelper.js";
import {
  getLastUpdatedChannel,
  updateChannel,
  updateChannelUpdateDay,
} from "../libs/db/channelHelper.js";
import { getProducts, getStoreInfo } from "../libs/naverApi.js";
import { ChannelOption, SalesResult } from "../types/types.js";
import dayjs from "dayjs";
import { getDayDate } from "../libs/dateHelper.js";
import sleep from "sleep-promise";

const 수집일자주기_DAY = 3;
const 최소매출_DAY = 50000;

var salesResult: SalesResult[] = [];

async function main() {
  console.log("================================================");
  console.log("[START] 상품정보 수집 프로세스");

  var channel = await getLastUpdatedChannel();

  if (!channel) {
    console.error("[오류0] 채널이 없습니다.");
    return;
  }

  console.log(`[STEP-01] 수집시작 - 채널URL : ${channel.url}`);

  try {
    if (!channel.no) {
      //! 스토어NO가 없는경우

      console.log("------------------------------------------------");
      console.log(
        `[STEP-02-01] 신규채널 수집 (시작) - 채널URL : ${channel.url}`
      );
      //* 스마트스토어 정보 API 호출
      const storeInfo = await getStoreInfo(channel.url);
      console.log(
        `[STEP-02-02] 신규채널 수집 (완료✅) - 채널URL : ${channel.url} / 채널ID : ${storeInfo.channel.id}`
      );

      // 전체보기 카테고리
      const categorieAll = storeInfo.firstCategories
        .filter((ele) => ele.categoryId === "ALL")
        .shift();

      // 첫번째 카테고리
      const categorieFirst = storeInfo.firstCategories[0];

      //* DB저장 속성 추출
      const options: ChannelOption = {
        no: storeInfo.channel.id!,
        name: storeInfo.channel.channelName!,
        grade: storeInfo.channel.actionGrade!,
        contactTel: storeInfo.channel.representTelephoneNumber!,
        address: storeInfo.channel.businessAddressInfo.fullAddressInfo!,
        email: storeInfo.channel.chrgrEmail!,
        saleCount: storeInfo.channel.saleCount!,
        birthDay: storeInfo.channel.representativeBirthDay
          ? dayjs(storeInfo.channel.representativeBirthDay).toDate()
          : null,
        productCount: storeInfo.productCount!,
        representName: storeInfo.channel.representName!,
        representativeName: storeInfo.channel.representativeName!,
        businessType: storeInfo.channel.businessType!,
        firstCategoriesStr: categorieFirst.name!,
        firstCategoriesCreateDate: categorieAll
          ? dayjs(categorieAll.createdDate).toDate()
          : dayjs(categorieFirst.createdDate).toDate(),
        priorityRate: 10,
      };

      console.log(
        `[STEP-02-03] 신규채널 등록 (시작) - 채널URL : ${channel.url} / 채널ID : ${storeInfo.channel.id}`
      );
      //* DB Update
      channel = await updateChannel(channel.id, options);

      console.log(
        `[STEP-02-03] 신규채널 등록 (완료✅) - 채널URL : ${channel.url} / 채널ID : ${channel.no}`
      );
    }

    console.log("------------------------------------------------");
    console.log(
      `[STEP-03-01] 상품정보 수집 (시작) - 채널URL : ${channel.url} / 채널ID : ${channel.no}`
    );

    if (channel && channel.id && channel.no) {
      const today = getDayDate();

      const day = dayjs(today).diff(dayjs(channel.updateDay), "day");

      if (수집일자주기_DAY > day) {
        console.log(`마지막 수집 : ${day} 일전`);
        console.log(`수집일자 기준을 만족하지 못해 종료 합니다. ✅`);
        return;
      }

      const productResponse = await getProducts(channel.no, "POPULAR", 10);

      const categorys = productResponse.simpleProducts.map(
        (ele) => ele.category
      );

      //* 카테고리 목록 업데이트
      await prisma.category.createMany({
        data: categorys,
        skipDuplicates: true,
      });
      await sleep(1000);
      // console.log(categorys);

      productResponse.simpleProducts.forEach(async (product, idx, all) => {
        const price = product.benefitsView.mobileDiscountedSalePrice; // 상품가격
        const saleCount6M = product.saleAmount.cumulationSaleCount; // 판매건수 6개월
        const saleCount3D = product.saleAmount.recentSaleCount; // 판매건수 3일
        const saleAmount6M = price * saleCount6M; // 매출 6개월
        const saleAmount3D = price * saleCount3D; // 매출 3일

        const salCount6MAvg1D = saleCount6M / 180; // 예상판매건수(1일) / 6개월
        const salAmount6MAvg1D = Math.round(price * salCount6MAvg1D); // 예상매출(1일) / 6개월
        const salCount3DAvg1D = saleCount3D / 3; // 예상판매건수(1일) / 3일
        const salAmount3DAvg1D = Math.round(price * salCount3DAvg1D); // 예상매출(1일) / 3일

        if (최소매출_DAY > salAmount3DAvg1D) return;

        console.log(
          `[STEP-03-02] 상품정보 등록 (${idx + 1}/${all.length}) - ${
            product.id
          } / ${product.name}`
        );

        const result: SalesResult = {
          channelUrl: channel?.url!,
          channelNo: channel?.no!,
          channelName: channel?.name!,
          price,
          saleCount6M,
          saleCount3D,
          saleAmount6M,
          saleAmount3D,
          salCount6MAvg1D,
          salAmount6MAvg1D,
          salCount3DAvg1D,
          salAmount3DAvg1D,
          productId: product.id,
          productName: product.name,
          url: `https://m.smartstore.naver.com/${channel?.url}/products/${product.id}`,
        };
        salesResult.push(result);

        var categorie = await prisma.category.findUnique({
          where: { categoryId: product.category.categoryId },
        });

        if (!categorie) {
          categorie = await prisma.category.create({
            data: { ...product.category },
          });
        }

        await prisma.product.upsert({
          where: { id: product.id.toString() },
          update: {
            updateAt: getDayDate(),
            name: product.name,
            imageUrl: product.representativeImageUrl,
            sales: {
              create: {
                createDay: getDayDate(),
                price: price,
                saleCount6M: saleCount6M, // 판매건수 6개월
                saleAmount6M: saleAmount6M, // 매출 6개월
                saleCount3D: saleCount3D, // 판매건수 3일
                saleAmount3D: saleAmount3D, // 매출 3일

                salCount6MAvg1D: parseFloat(salCount6MAvg1D.toFixed(2)), // 예상판매건수(1일) / 6개월
                salAmount6MAvg1D: salAmount6MAvg1D, // 예상매출(1일) / 6개월
                salCount3DAvg1D: parseFloat(salCount3DAvg1D.toFixed(2)), // 예상판매건수(1일) / 3일
                salAmount3DAvg1D: salAmount3DAvg1D, // 예상매출(1일) / 3일
                channelNo: product.channel.channelNo,
              },
            },
          },
          create: {
            updateAt: getDayDate(),
            id: product.id.toString(),
            name: product.name,
            imageUrl: product.representativeImageUrl,
            channelNo: product.channel.channelNo,
            categoryId: categorie.categoryId,
            sales: {
              create: {
                createDay: getDayDate(),
                price: price,
                saleCount6M: saleCount6M, // 판매건수 6개월
                saleAmount6M: saleAmount6M, // 매출 6개월
                saleCount3D: saleCount3D, // 판매건수 3일
                saleAmount3D: saleAmount3D, // 매출 3일

                salCount6MAvg1D: parseFloat(salCount6MAvg1D.toFixed(2)), // 예상판매건수(1일) / 6개월
                salAmount6MAvg1D: salAmount6MAvg1D, // 예상매출(1일) / 6개월
                salCount3DAvg1D: parseFloat(salCount3DAvg1D.toFixed(2)), // 예상판매건수(1일) / 3일
                salAmount3DAvg1D: salAmount3DAvg1D, // 예상매출(1일) / 3일
                channelNo: product.channel.channelNo,
              },
            },
          },
        });
      });
    }
    // console.log(SortType.POPULAR);
  } catch (error) {
    throw error;
  } finally {
    await updateChannelUpdateDay(channel.id);
  }
}

main()
  .then(async () => {
    await serverPing();
    if (0 < salesResult.length) {
      // if (true) {
      console.log("================================================");
      console.log(
        `[수집완료] 판매처:${salesResult[0].channelName} - ${salesResult.length}건`
      );

      salesResult.forEach((ele) =>
        console.log(
          `상품명:${ele.productName}\n` +
            `매출(1일):${ele.salAmount3DAvg1D.toLocaleString()}원, ` +
            `판매건수(1일):${ele.salCount3DAvg1D.toLocaleString()}건\n` +
            `URL:${ele.url}\n\n`
        )
      );
    }
  })
  .catch(async (e: Error) => {
    console.log(`[오류발생 ❌]`);
    console.error(e);
    await serverPing(e.stack);
  })
  .finally(async () => {
    console.log("================================================");
    await prisma.$disconnect();

    process.exit(1);
  });
