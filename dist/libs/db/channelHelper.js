import prisma from "../prismadb.js";
import { getDayDate } from "../dateHelper.js";
export async function getLastUpdatedChannel() {
    return await prisma.channel.findFirst({ orderBy: { updateDay: "asc" } });
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
