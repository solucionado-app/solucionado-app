// import { clerkClient } from "@clerk/nextjs/dist/types/server";

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({
    findByRequestId: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string(),
        })
    ).query(async({ ctx, input }) => {

        const budgets = await ctx.prisma.budget.findMany({
            where: {
                serviceRequestId: input.serviceRequestId,
                authorId: ctx.auth.userId,
            },
            select: {
                id: true,
                description: true,
                price: true,
                estimatedAt: true,
                status: true,
                updatedAt: true,
                createdAt: true,
                serviceRequestId: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                        mpCode: true,
                    }
                },
            }

        });
        const reviewData = await ctx.prisma.review.groupBy({
            by: ['userId'],
            where: {
                userId: ctx.auth.userId,
            },
            _avg: {
                rating: true,
            },
            _count: {
                _all: true,
            },
        });
        if (budgets === null) {
            throw new Error("Budget not found");
        }
        for (const budget of budgets) {
                const data = reviewData.find((item: {userId: string}) => item.userId === budget.author.id);
                if (data) {

                    const jsonCompatibleRating = data._avg.rating?.toString();
                    budget.author.mpCode = { rating: jsonCompatibleRating , count: data._count._all  };
                }

        }
        // console.log(budgets);


        // console.log(budgets);
        return budgets;
    }),
    getAll: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string(),
        })
    ).query(async({ ctx, input }) => {
        const budgets= await ctx.prisma.budget.findMany({
            where: {
                serviceRequestId: input.serviceRequestId,
            },
            select: {
                id: true,
                description: true,
                price: true,
                estimatedAt: true,
                status: true,
                updatedAt: true,
                createdAt: true,
                serviceRequestId: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                        mpCode: true,
                    },

                },
            }

        });

        const authorIds = budgets.map((budget) => budget.author.id);


        const reviewData = await ctx.prisma.review.groupBy({
            by: ['userId'],
            where: {
                userId: {
                    in: authorIds,
                },
            },
            _avg: {
                rating: true,
            },
            _count: {
                _all: true,
            },
        });

        // console.log(reviewData);

        for (const budget of budgets) {


                const data = reviewData.find((item: {userId: string}) => item.userId === budget.author.id);
                if (data) {

                    const jsonCompatibleRating = data._avg.rating?.toString();
                    budget.author.mpCode = { rating: jsonCompatibleRating , count: data._count._all  };
                }

        }
        // console.log(budgets);
        return budgets;
    }),
    create: protectedProcedure.input(
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
                    author: {
                        connect: {
                            externalId: ctx.auth.userId,
                        },
                    },
                    serviceRequest: {
                        connect: {
                            id: input.serviceRequestId,
                        },
                    },

                },
                include: {
                    author: {
                        select: {
                            first_name: true,
                            last_name: true,
                            image_url: true,
                        }
                    },
                },

            });
        }),
        accept: protectedProcedure.input(
            z.object({
                budgetId: z.string(),
                serviceRequestId: z.string(),
            })).mutation(async({ ctx, input }) => {

                await ctx.prisma.budget.updateMany({
                    where: {
                        serviceRequestId: input.serviceRequestId,
                        id: {
                            not: input.budgetId,
                        },
                    },
                    data: {
                        status: "REJECTED",
                    },
                });

                return ctx.prisma.budget.update({
                    where: {
                        id: input.budgetId,
                    },
                    data: {
                        status: "ACEPTED",
                    },
                    include: {
                       author: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                emailAddressId: true,
                            }
                        },
                    },
                });
            }),


});
