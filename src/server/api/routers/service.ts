import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const serviceRouter = createTRPCRouter({
  findById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          description: true,
          status: true,
          budget: {
            select: {
              id: true,
              price: true,
              author: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  image_url: true,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany({
      where: {
        budget: {
          userId: ctx.auth.userId,
        },
      },
      select: {
        id: true,
        description: true,
        status: true,
        budget: {
          select: {
            id: true,
            price: true,
            estimatedAt: true,
            author: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                image_url: true,
              },
            },
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        categoryId: z.number(),
        budgetId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.create({
        data: {
          name: input.title,
          budget: {
            connect: {
              id: input.budgetId,
            },
          },
          description: input.description,
          category: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
    }),
});
