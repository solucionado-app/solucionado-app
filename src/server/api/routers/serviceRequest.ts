import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const serviceRequestRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.serviceRequest.findMany();
    }),
    getUserRequest: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.serviceRequest.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userId: ctx.auth.userId,
            },
            include: {
                category: true,
            }
        });
    }),
    create: publicProcedure.input(
        z.object({
            userId: z.string(),
            status: z.string().optional(),
            details: z.record(z.string(), z.any()).optional(),
            categorySlug: z.string(),
            date: z.date().optional(),
            description: z.string().optional(),
            province: z.string().optional(),
            city: z.string().optional(),
            address: z.string().optional(),
            amount: z.string().optional(),
            schedule: z.string().optional(),
            urgency: z.string().optional(),
        })
    ).mutation(async ({ ctx, input }) => {
        const userId = input?.userId;
        console.log(userId);

        const serviceRequest = await ctx.prisma.serviceRequest.create({
            data: {
                status: "PENDING",
                details: input.details,
                user: {
                    connect: {
                        externalId: userId,
                    },
                },
                category: {
                    connect: {
                        slug: input.categorySlug,
                    },
                },
                date: input.date,
                description: input.description,
                province: input.province,
                city: input.city,
                address: input.address,
                amount: input.amount,
                schedule: input.schedule,
                urgency: input.urgency,
            }
        });
        return serviceRequest;

    }),
    findById: protectedProcedure.input(
        z.object({
            id: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.serviceRequest.findUnique({
            where: {
                id: input.id,
            },
            include: {
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            }
        });
    }),

});