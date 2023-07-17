// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categorieRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.categories.findMany();
  }),
});
