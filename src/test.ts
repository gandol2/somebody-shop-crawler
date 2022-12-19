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
import { printError, printInfo, printLog, printYellow } from "../libs/print.js";

const 수집일자주기_DAY = 3;
const 최소매출_DAY = 50000;

var salesResult: SalesResult[] = [];

async function main() {
  // var channel = await getLastUpdatedChannel();
  var channel = await prisma.channel.findUnique({
    where: { url: "dynjj" },
  });

  if (!channel) {
    printError(
      "DB에 등록된 채널이 없습니다. 채널정보를 등록 후 이용 해주세요."
    );
    printInfo("프로그램을 종료 합니다.");
    return;
  }

  printLog(`수집시작 (채널URL:${channel.url})`);

  try {
    if (!channel.no) {
      //! 스토어NO가 없는경우
      printInfo(
        `신규채널 - 채널NO가 없습니다. 채널정보를 가져오는중 (채널URL:${channel.url})`
      );

      //* 스마트스토어 정보 API 호출

      const storeInfo = await getStoreInfo(channel.url);
      // console.log(storeInfo);
      if (
        1 > storeInfo.productCount ||
        "탈퇴회원" === storeInfo.channel.representName ||
        "휴면회원" === storeInfo.channel.representName
      ) {
        console.log(
          `[채널삭제 💢 ] ${storeInfo.channel.representName} - ${channel.url}`
        );
        await prisma.channel.delete({ where: { url: channel.url } });
        channel = null;
        return;
      }

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

      //* DB Update
      channel = await updateChannel(channel.id, options);

      printLog(
        `신규채널 - 수집 완료 (채널URL:${channel.url} / 채널NO:${channel.no} / 채널이름:${channel.name})`
      );
    }

    //^ ========================================= 상품수집
    if (channel && channel.id && channel.no) {
      const today = getDayDate();

      const day = dayjs(today).diff(dayjs(channel.updateDay), "day");

      if (수집일자주기_DAY > day) {
        printInfo(
          `상품수집❌ - ${day}일전 상품 수집이 완료된 채널 입니다. (설정된 수집주기:${수집일자주기_DAY}일)`
        );
        printInfo("프로그램을 종료 합니다.");

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

      printInfo(
        `상품수집 - 시작 (${channel.name}:https://m.smartstore.naver.com/${channel.url})`
      );

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

        // printLog(
        //   `상품등록 - 매출(1일): ${salAmount3DAvg1D.toLocaleString()}원 / ${
        //     product.category.categoryName
        //   } : https://m.smartstore.naver.com/${channel?.url}/products/${
        //     product.id
        //   }`
        // );

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
  } catch (error) {
    throw error;
  } finally {
    if (channel) {
      await updateChannelUpdateDay(channel.id);
    }
  }
}

let start = dayjs();
let end;

main()
  .then(async () => {
    printInfo(
      `상품수집 - 완료 ${
        0 < salesResult.length ? `(${salesResult.length}개)` : `(고매출 상품❌)`
      }`
    );

    await serverPing();
    if (0 < salesResult.length) {
      // if (true) {

      salesResult.forEach((ele) =>
        printYellow(
          `찾은상품 - 매출(1일): ${ele.salAmount3DAvg1D.toLocaleString()}원 / ${
            ele.productName
          }:${ele.url}`
        )
      );
    }
  })
  .catch(async (e: Error) => {
    printError(`오류발생`);
    printError(e.message);
    if (e.stack) {
      printError(e.stack);
    }

    await serverPing(e.stack);
  })
  .finally(async () => {
    end = dayjs();
    printLog(
      `----------------------------------------------------- (실행시간 : ${end.diff(
        start,
        "second"
      )}초)`
    );
    await prisma.$disconnect();

    process.exit(1);
  });
