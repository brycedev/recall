import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const agentRouter = createTRPCRouter({
  // db.agent.activate
  activate: publicProcedure
    .input(z.object({ agentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.agent.update({
        where: { id: input.agentId },
        data: {
          activated: true, // activate the agent via a boolean
        },
      });
    }),
  // db.agent.getAll
  // get all agents and sort by id
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.agent.findMany({
      orderBy: { id: "asc" },
    });
  }),
});
