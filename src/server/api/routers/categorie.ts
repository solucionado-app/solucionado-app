import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categorieRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ctx.prisma.categorie.findMany();
  }),
});
