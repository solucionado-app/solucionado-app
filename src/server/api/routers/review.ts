import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reviewRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.review.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
        select: {
          id:true,
          rating: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              first_name: true,
              last_name: true,
              image_url: true,
            }
          },
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
    findbyServiceId: protectedProcedure.input(z.object({ serviceId: z.string() })).query(async ({ ctx, input }) => {
      return await ctx.prisma.review.findUniqueOrThrow({
        where: { serviceId: input.serviceId },
        select:{
          rating: true,
          content: true,

        }
      });
    }),
    createOrUpdate: protectedProcedure.input(
      z.object({
        serviceId: z.string(),
        rating: z.number(),
        content: z.string().optional(),
        userId: z.string(),
      })
    ).mutation(async ({ ctx, input }) => {
      const { serviceId, rating, content } = input;
      const { userId } = ctx.auth;
      const review = await ctx.prisma.review.upsert({
        where: {
            serviceId: serviceId,
        },
        create: {
          rating,
          content,
          service:{
            connect:{
              id: serviceId,
            }
          },
          user:{
            connect:{
              id: input.userId,
            }
          },
          author:{
            connect: {
              id: userId,
            },
          },
        },
        update:{
          rating,
          content,
        }
      });
      return review;


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
