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
        });
    }),
    markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
        const notifications = await ctx.prisma.user.update({
            where: {
                externalId: ctx.auth.userId,
            },
            data: {
                notificationRecieved: {
                    updateMany: {
                        where: {
                            read: false,
                        },
                        data: {
                            read: true,
                        },
                    },
                },
            },
            select: {
                notificationRecieved: true,
            }
        });
        console.log(notifications);
        return notifications;
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
                read: false,
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
                read: true,
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
    count: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.notification.count({
            where: {
                read: false,
                users: {
                    some: {
                        externalId: ctx.auth.userId,
                    },
                }
            },
        });
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