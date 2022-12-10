import prisma from "./libs/prismadb";
import fs from "fs";
// import { serverPing } from "../libs/ServerHelper";
import { publicIpv4 } from "public-ip";

const 채널파일경로 = "data/channel_221210.txt";

async function main() {
  console.log("[01] 채널 등록 시작");
  const ip = await publicIpv4();
  console.log("[02] 채널 등록 시작");

  const 채널목록 = fs.readFileSync(채널파일경로, "utf-8").split("\n");
  console.log(채널목록);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default main;
