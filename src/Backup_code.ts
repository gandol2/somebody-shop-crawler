// 채널정보 인덱싱 스크립트
import Dotenv from "dotenv";
Dotenv.config();
import prisma from "../libs/prismadb.js";
import dayjs from "dayjs";
import {
  getMallBasicInfo,
  getMallInfo,
  getMallUrlByCrUrl,
} from "../libs/naverApi.js";
import _ from "lodash";

if (!process.env.CURRENT_SERVER_IDX) {
  console.error("서버 번호를 확인할 수 없습니다. 프로그램을 종료 합니다.");
  process.exit(-1);
}

const currentServerIdx = Number(process.env.CURRENT_SERVER_IDX);
const serverIdxArr = [currentServerIdx, currentServerIdx + 5];

async function main() {
  //^ 인덱싱할 채널 목록 획득
  const channels = await prisma.channel.findMany({
    where: {
      AND: [{ channelName: { not: null } }, { indexedAt: null }],
      OR: [
        { channelNo: { endsWith: serverIdxArr[0].toString() } },
        { channelNo: { endsWith: serverIdxArr[1].toString() } },
      ],
    },
    take: 3,
    select: {
      channelNo: true,
      url: true,
      channelName: true,
    },
  });

  //^ 인덱싱할 채널이 없는경우 종료
  //   console.log(channels.length);
  //   console.log(channels);
  if (1 > channels.length) {
    console.error(
      `[INFO] [1] 인덱싱할 채널이 없습니다. (서버IDX : ${currentServerIdx})`
    );
    process.exit(-1);
  }

  const currentChannel = channels[0];
  var channelUrl: string | undefined;
  //^ -----------------------------------------------------------------------
  try {
    //^ 첫번째 채널 선택
    // console.log(channels);
    if (!currentChannel.channelName) {
      throw `[WARN] [2] [${currentChannel.channelNo}] (서버IDX:${currentServerIdx}) DB 레코드에 채널명이 없습니다`;
    }

    //^ 채널명 검색
    const basicInfo = await getMallBasicInfo(currentChannel.channelName);
    if (!basicInfo) {
      throw `[WARN] [3] [${currentChannel.channelNo}] (채널명:${currentChannel.channelName}) 채널명 검색 결과 없음`;
    }

    //^ 채널 crUrl로 URL 획득
    channelUrl = await getMallUrlByCrUrl(basicInfo.crUrl);
    if (!channelUrl) {
      throw `[WARN] [4] [${currentChannel.channelNo}] (채널명:${currentChannel.channelName}) 채널 URL 획득실패`;
    }

    //^ 채널 상세정보 획득
    const channelInfo = await getMallInfo(channelUrl);
    if (!channelInfo) {
      throw `[WARN] [5] [${currentChannel.channelNo}] (채널명:${currentChannel.channelName}) 채널 정보 획득 실패`;
    }
    // console.log(channelInfo);

    const sortCategories = _.sortBy(channelInfo.firstCategories, (ele) =>
      dayjs(ele.createdDate, ["YYYY-MM-DD"], true).toDate()
    );

    await prisma.channel.update({
      where: { channelNo: currentChannel.channelNo },
      data: {
        indexedAt: new Date(),
        totalCount: channelInfo.productCount,
        url: channelInfo.channel.url,
        grade: channelInfo.channel.actionGrade,
        contactTel: channelInfo.channel.representTelephoneNumber,
        address: channelInfo.channel.businessAddressInfo.address,
        email: channelInfo.channel.chrgrEmail,
        birthDay: channelInfo.channel.representativeBirthDay,
        representName: channelInfo.channel.representName,
        representativeName: channelInfo.channel.representativeName,
        businessType: channelInfo.channel.businessType,
        firstCategoriesStr:
          sortCategories && 0 < sortCategories.length
            ? sortCategories[0].name
            : null,
        firstCategoriesCreateDate:
          sortCategories && 0 < sortCategories.length
            ? dayjs(
                sortCategories[0].createdDate,
                ["YYYY-MM-DD"],
                true
              ).toDate()
            : null,
      },
    });
    console.log(
      `[INFO] [6] [${currentChannel.channelNo}] (채널명:${currentChannel.channelName}) 완료 ✅`
    );
  } catch (e) {
    console.error(`${e} ❌`);
    await prisma.channel.update({
      where: {
        channelNo: currentChannel.channelNo,
      },
      data: { indexedAt: new Date() },
    });
  }
}

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
