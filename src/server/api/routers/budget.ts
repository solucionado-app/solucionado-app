// import { clerkClient } from "@clerk/nextjs/dist/types/server";
import { BudgetsTableProps } from "@/src/components/budgets/BudgetsTable";
import { Budget, Status, User } from "@prisma/client";
import { JSONValue } from "superjson/dist/types";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({
    findByRequestId: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string(),
        })
    ).query(({ ctx, input }) => {

        const serviceRequest = ctx.prisma.budget.findMany({
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

        if (serviceRequest === null) {
            throw new Error("Budget not found");
        }
        // console.log(serviceRequest);
        return serviceRequest;
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

        // Get review data for all authors
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const reviewData = await prisma.review.groupBy({
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

        console.log(reviewData);
        const checkedAuthors = new Set();

        for (const budget of budgets) {

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const data = reviewData.find((item: {userId: string}) => item.userId === budget.author.id);
                if (data) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    budget.author.mpCode = { rating: data._avg.rating , count: data._count._all  };
                }
                checkedAuthors.add(budget.author.id);

        }
        console.log(budgets);
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
