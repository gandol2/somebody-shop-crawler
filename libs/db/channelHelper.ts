import { Channel } from "@prisma/client";
import prisma from "../prismadb.js";
import { ChannelOption } from "../../types/types.js";
import { getDayDate } from "../dateHelper.js";

function rand(start: number, end: number) {
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

  // console.log(idx);

  return channel;
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
