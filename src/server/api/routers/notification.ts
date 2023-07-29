import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.notification.findMany({
            where: {
                users: {
                    some: {
                        externalId: ctx.auth.userId,
                    },
                }
            },
            include: {
                readBy: {
                    where: {
                        externalId: ctx.auth.userId,
                    },
                },
            },
        });
    }),
    markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
        const notification = await ctx.prisma.user.update({
            where: {
                id: ctx.auth.userId,
            },
            data: {
                notificationsReaded: {
                    connect: (await ctx.prisma.notification.findMany({
                        where: {
                            users: {
                                some: {
                                    externalId: ctx.auth.userId,
                                },
                            },
                        },
                    })).map((notification) => {
                        return {
                            id: notification.id,
                        };
                    }
                    ),
                }
            },
        });
        console.log(notification);
        return notification;
    }),
    markAsUnread: protectedProcedure.input(
        z.object({
            notificationId: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const notification = await ctx.prisma.notification.update({
            where: {
                id: input.notificationId,
            },
            data: {
                readBy: {
                    disconnect: [{
                        id: ctx.auth.userId,
                    },],
                },
            },
        });
        return notification;
    }),
    markAsRead: protectedProcedure.input(
        z.object({
            notificationId: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const notification = await ctx.prisma.notification.update({
            where: {
                id: input.notificationId,
            },
            data: {
                readBy: {
                    connect: [{
                        id: ctx.auth.userId,
                    },],
                },
            },
        });
        return notification;
    }),
    delete: protectedProcedure.input(
        z.object({
            notificationId: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const notification = await ctx.prisma.user.update({
            where: {
                externalId: ctx.auth.userId,
            },
            data: {
                notificationRecieved: {
                    disconnect: [{
                        id: input.notificationId,
                    },],
                },
            },
            select: {
                notificationRecieved: true,
            }
        });
        return notification;
    }),
    countUnRead: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.notification.count({
            where: {
                users: {
                    some: {
                        externalId: ctx.auth.userId,
                    },
                },
                readBy: {
                    none: {
                        externalId: ctx.auth.userId,
                    },
                }
            },
        });
    }),
    createBudgetNotification: protectedProcedure.input(
        z.object({
            link: z.string().optional(),
            title: z.string(),
            content: z.string(),
            budgetId: z.string(),
            serviceRequestId: z.string(),
            userId: z.string(),

        })
    ).mutation(async ({ ctx, input }) => {

        const notification = await ctx.prisma.notification.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                users: {
                    connect: {
                        externalId: input?.userId,
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
                budget: {
                    connect: {
                        id: input.budgetId,
                    },
                },
            },
        });
        return notification;
    }),
    createCommentNotification: protectedProcedure.input(
        z.object({
            link: z.string().optional(),
            title: z.string(),
            content: z.string(),
            serviceRequestId: z.string(),
            userId: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {

        const notification = await ctx.prisma.notification.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                users: {
                    connect: {
                        externalId: input?.userId,
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
        });
        return notification;
    }),
    create: protectedProcedure.input(
        z.object({
            categorySlug: z.string(),
            serviceRequestId: z.string().optional(),
            content: z.string(),
            title: z.string(),
            link: z.string().optional(),
        })
    ).mutation(async ({ ctx, input }) => {
        const users = await ctx.prisma.user.findMany({
            where: {
                categories: {
                    some: {
                        slug: input.categorySlug,
                    },
                },
            },
        });
        const notification = await ctx.prisma.notification.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                users: {
                    connect: users?.length > 0 ? users?.map((user?) => {
                        return {
                            id: user.id,
                        };
                    }) : [],
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
        });
        return notification;

    }),

});