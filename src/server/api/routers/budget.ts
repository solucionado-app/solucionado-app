import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({
    findById: protectedProcedure.input(
        z.object({
            id: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.budget.findUnique({
            where: {
                id: input.id,
            },
        });
    }),
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.budget.findMany();
    }),
    create:protectedProcedure.input(
        z.object({
            description: z.string(),
            price: z.number(),
            estimatedAt: z.date(),
            userId: z.string(),
            serviceRequestId: z.string(),
        })).mutation(({ ctx, input }) => {
            
        return ctx.prisma.budget.create({
            data: {
                description: input.description,
                price: input.price,
                estimatedAt: input.estimatedAt,
                user: {
                    connect: {
                        externalId: input.userId,
                    },
                },
                serviceRequest: {
                    connect: {
                        id: input.serviceRequestId,
                    },
                },
            },
        });
    }),
});
