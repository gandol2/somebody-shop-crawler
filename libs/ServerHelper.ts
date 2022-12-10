import prisma from "../libs/prismadb.js";
import { publicIpv4 } from "public-ip";
import dayjs from "dayjs";
import fs from "fs";

//* get public IP Address
async function getIPAddress() {
  var ip: string = "-1";
  try {
    // 파일에서 가져오기
    ip = fs.readFileSync("myIP.txt", "utf-8");
    console.log(`[IP] ${ip} - Source : myIP.txt`);
  } catch (err) {
    // 파일이 없으면 인터넷에서 가져오기
    ip = await publicIpv4();
    fs.writeFileSync("myIP.txt", ip);
    console.log(`[IP] ${ip} - Source : public-ip`);
  }
  return ip;
}

// 서버 PING
export async function serverPing(error?: string) {
  console.log(`\nserverPing ✅`);
  const ip = await getIPAddress();

  if (error) {
    await prisma.server.upsert({
      where: { ip: ip },
      update: {
        hasError: true,
        error: error,
        errorAt: dayjs().toDate(),
        updateAt: dayjs().toDate(),
      },
      create: {
        ip: ip,
        hasError: true,
        error: error,
        errorAt: dayjs().toDate(),
        updateAt: dayjs().toDate(),
      },
    });
  } else {
    await prisma.server.upsert({
      where: { ip: ip },
      update: { updateAt: dayjs().toDate() },
      create: {
        ip: ip,
        updateAt: dayjs().toDate(),
      },
    });
  }
}
