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
                author:{
                    connect:{
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