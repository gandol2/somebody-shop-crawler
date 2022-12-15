import prisma from "../prismadb.js";
import { publicIpv4 } from "public-ip";
import fs from "fs";
import path from "path";
import { getDate } from "../dateHelper.js";
const IP파일경로 = path.join(process.env.PWD, "myIP.txt");
//* get public IP Address
async function getIPAddress() {
    var ip = "-1";
    try {
        // 파일에서 가져오기
        ip = fs.readFileSync(IP파일경로, "utf-8");
        // console.log(`[IP] ${ip} - Source : myIP.txt`);
    }
    catch (err) {
        // 파일이 없으면 인터넷에서 가져오기
        ip = await publicIpv4();
        fs.writeFileSync(IP파일경로, ip);
        // console.log(`[IP] ${ip} - Source : public-ip`);
    }
    return ip;
}
// 서버 PING
export async function serverPing(error) {
    // console.log(`\nserverPing ✅`);
    const ip = await getIPAddress();
    if (error) {
        const server = await prisma.server.upsert({
            where: { ip: ip },
            update: { updateAt: getDate() },
            create: {
                ip: ip,
                updateAt: getDate(),
            },
        });
        await prisma.serverError.create({
            data: { error: error, serverId: server.id },
        });
    }
    else {
        await prisma.server.upsert({
            where: { ip: ip },
            update: { updateAt: getDate() },
            create: {
                ip: ip,
                updateAt: getDate(),
            },
        });
    }
}
