import { Channel } from "@prisma/client";
import prisma from "../prismadb.js";
import { ChannelOption } from "../../types/types.js";
import { getDayDate } from "../dateHelper.js";

export async function getLastUpdatedChannel() {
  return await prisma.channel.findFirst({ orderBy: { updateDay: "asc" } });
}

export async function updateChannel(channelId: number, option: ChannelOption) {
  return await prisma.channel.update({
    where: { id: channelId },
    data: { ...option },
  });
}

export async function updateChannelUpdateDay(channelId: number) {
  return await prisma.channel.update({
    where: { id: channelId },
    data: {
      updateDay: getDayDate(),
    },
  });
}
