 import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categorieRouter = createTRPCRouter({
  findBySlug: publicProcedure.input(
    z.object({
      slug: z.string(),
    })
  ).query(({ ctx, input }) => {
    return  ctx.prisma.category.findUnique({
      where: {
        slug: input.slug,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
});
