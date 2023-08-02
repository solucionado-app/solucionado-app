import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
            select:{
                id: true,
                status: true,
                createdAt: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                address: true,
                amount: true,
                schedule: true,
                urgency: true,
                details: true,
                description: true,
                date: true,
                city: true,
                province: true,
            }
        });
    }),
    create: protectedProcedure.input(
        z.object({
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

        const serviceRequest = await ctx.prisma.serviceRequest.create({
            data: {
                status: "PENDING",
                details: input.details,
                user: {
                    connect: {
                        externalId: ctx.auth.userId,
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

            },
            include: {
                category: {
                    select: {
                        name: true,
                    }
                }
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