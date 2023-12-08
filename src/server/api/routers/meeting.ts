/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createBot, deleteBot } from "../services/recall";
import { createMeeting } from "../services/zoom";
import { z } from "zod";

export const meetingRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // get all activated agents
    const activatedAgents = await ctx.db.agent.findMany({
      where: { activated: true },
    });

    // we need at least one agent to create a meeting
    if (activatedAgents.length === 0) {
      throw new Error("No agents are activated");
    }

    // create a list of agent names OXFORDCOMMA-IZED of course
    const listFormatter = new Intl.ListFormat("en", { style: "long" });
    const botName = listFormatter.format(
      activatedAgents.map((agent) => agent.name),
    );

    // call out to our zoom service to create a meeting
    const zoomMeeting = await createMeeting({});
    // call out to our recall service to create a bot, passing in the meeting url we just got from zoom
    const recallBot = await createBot({
      botName,
      meetingUrl: zoomMeeting.join_url,
    });

    // create a meeting in the database to represent our zoom and recall 🤝
    return ctx.db.meeting.create({
      data: {
        agents: {
          connect: activatedAgents.map((agent) => ({ id: agent.id })),
        },
        active: true,
        zoomId: zoomMeeting.id.toString(),
        recallId: recallBot.id,
        zoomUrl: zoomMeeting.join_url,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.meeting.findMany({
      orderBy: { id: "desc" },
    });
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.meeting.findUnique({
        where: { id: input.id },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const meeting = ctx.db.meeting.findUnique({
        where: { id: input.id },
      });

      if (meeting.recallId !== null) {
        // call out to our recall service to delete the bot
        await deleteBot({ id: meeting.recallId });
      }

      // delete the meeting resource from the database
      return ctx.db.meeting.delete({
        where: { id: input.id },
      });
    }),
});
