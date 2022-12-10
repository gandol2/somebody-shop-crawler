import prisma from "./libs/prismadb.js";
import fs from "fs";
import { serverPing } from "./libs/ServerHelper.js";

const 채널파일경로 = "data/channel_221210.txt";

async function main() {
  console.log("[START] 채널 등록 프로세스");

  console.log("채널목록 파일 Open");
  const channels = fs.readFileSync(채널파일경로, "utf-8").split("\n");
  console.log(`채널목록 Open 완료 ✅`);
  console.log(`[전체:${channels.length.toLocaleString()}]`);

  const result = await prisma.channel.createMany({
    data: channels.map((ele) => ({ url: ele })),
    skipDuplicates: true,
  });

  console.log(`채널목록 DB 등록 완료 ✅`);

  console.log(
    `[성공:${result.count.toLocaleString()} / 전체:${channels.length.toLocaleString()}]`
  );
}

main()
  .then(async () => {
    await serverPing();
  })
  .catch(async (e: Error) => {
    console.log(`[오류발생 ❌]`);
    console.error(e);
    await serverPing(e.stack);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
