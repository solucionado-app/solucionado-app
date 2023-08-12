import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reviewRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.review.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          service: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  getNumberOfReviewsUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.review.count({
        where: {
          userId: input.userId,
        },
      });
    }),
});
