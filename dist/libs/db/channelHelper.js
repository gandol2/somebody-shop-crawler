import prisma from "../prismadb.js";
import { getDayDate } from "../dateHelper.js";
function rand(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}
export async function getLastUpdatedChannel() {
    const channels = await prisma.channel.findMany({
        take: 10,
        orderBy: { updateDay: "asc" },
    });
    // console.log(channels);
    const idx = rand(0, channels.length);
    const channel = channels[idx];
    console.log(`select channels = ${idx}/${channels.length}`);
    return channel;
}
export async function updateChannel(channelId, option) {
    return await prisma.channel.update({
        where: { id: channelId },
        data: Object.assign({}, option),
    });
}
export async function updateChannelUpdateDay(channelId) {
    return await prisma.channel.update({
        where: { id: channelId },
        data: {
            updateDay: getDayDate(),
        },
    });
}
