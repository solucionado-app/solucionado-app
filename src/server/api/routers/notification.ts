import { clerkClient } from "@clerk/nextjs";
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
        // console.log(notification);
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
            authorName: z.string(),
            authorLastName: z.string(),

        })
    ).mutation(async ({ ctx, input }) => {

        const user = await ctx.prisma.user.findUnique({
            where: {
                externalId: input.userId,
            },
            select: {
                first_name: true,
                last_name: true,
                emailAddressId: true,
            },
        });

        clerkClient.emails.createEmail({
            fromEmailName: "info",
            body: `hola ${user?.first_name || ""} ${user?.last_name || ""} el usuario  ${input.authorName} ${input.authorLastName} ha enviado un presupuesto para tu solicitud de servicio
            Entra a este link para ver los detalles de la solicitud: solucionado-app.vercel.app/${input.link || "solicitudes-de-servicio"}/${input.serviceRequestId}
            `,
            subject: `Nuevo presupuesto para tu solicitud de servicio`,
            emailAddressId: user?.emailAddressId as string,
        }).then((res) => {
             console.log(res)
        }
        ).catch((err) => {
             console.log(err)
        }
        );

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
    createBudgetAcceptedNotification: protectedProcedure.input(
        z.object({
            link: z.string().optional(),
            title: z.string(),
            content: z.string(),
            budgetId: z.string(),
            serviceRequestId: z.string(),
            userId: z.string(),
            authorName: z.string(),
            authorLastName: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                externalId: input.userId,
            },
            select: {
                first_name: true,
                last_name: true,
                emailAddressId: true,
            },
        });
        clerkClient.emails.createEmail({
            fromEmailName: "info",
            body: `hola ${user?.first_name || ""} ${user?.last_name || ""} el usuario  ${input.authorName} ${input.authorLastName} ha aceptado tu presupuesto para su solicitud de servicio
            Entra a este link para ver los detalles de la solicitud: solucionado-app.vercel.app/${input.link || "solicitudes-de-servicio"}/${input.serviceRequestId}
            `,
            subject: `Presupuesto aceptado para tu solicitud de servicio`,
            emailAddressId: user?.emailAddressId as string,
        }).then((res) => {
                console.log(res)
        })
        .catch((err) => {
                console.log(err)
        });
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
                budget: {
                    connect: {
                        id: input.budgetId,
                    },
                },
                serviceRequest: {
                    connect: {
                        id: input.serviceRequestId,
                    },
                },
                author: {
                    connect: {
                        externalId: ctx.auth.userId,
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
            authorName: z.string(),
            authorLastName: z.string(),
            userId: z.string(),
            categoryName: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const users = await ctx.prisma.user.findMany({
            where: {
                OR: [
                    {
                        comentsmade: {
                            some: {
                                serviceRequestId: input.serviceRequestId,
                            },
                        },
                    },
                    {
                        budgetsMade: {
                            some: {
                                serviceRequestId: input.serviceRequestId,
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                last_name: true,
                first_name: true,
                emailAddressId: true,
            },
            distinct: ['id'],
        });
        if (!users.find((user) => user.id === input.userId)) {
            const serviceRequestAuthor = await ctx.prisma.user.findUnique({
                where: {
                    externalId: input.userId,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    emailAddressId: true,
                },
            });
            if (serviceRequestAuthor) {
                users.push(serviceRequestAuthor);
            }
        }
        const filteredUsers = users.filter((user) => user.id !== ctx.auth.userId);
        if (filteredUsers.length === 0) {
            return null;
        }
        !!filteredUsers && filteredUsers.length > 0 && filteredUsers.forEach((user) => {
            clerkClient.emails.createEmail({
                fromEmailName: "info",
                body: `${input.authorName} ${input.authorLastName} ha comentado la solicitud de servicio de ${input.categoryName}
                    Entra a este link para ver los detalles de la solicitud: solucionado-app.vercel.app/${input.link || "solicitudes-de-servicio"}/${input.serviceRequestId}
                    `,
                subject: `Nuevo comenario en Solicitud de servicio en ${input.categoryName}`,
                emailAddressId: user.emailAddressId as string,
            }).then((res) => {
                 console.log(res)
            }
            ).catch((err) => {
                console.log(err)
            }
            );
        });


        const notification = await ctx.prisma.notification.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                users: {
                    connect: filteredUsers?.length > 0 ? filteredUsers?.map((user?) => {
                        return {
                            id: user.id,
                        };
                    }
                    ) : [],
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
    createServiceNotification: protectedProcedure.input(
        z.object({
            link: z.string().optional(),
            title: z.string(),
            content: z.string(),
            serviceId: z.string(),
            userId: z.string(),
            authorName: z.string(),
            authorLastName: z.string(),
        })    ).mutation(async ({ ctx, input }) => {

            const user = await ctx.prisma.user.findUnique({
                where: {
                    externalId: input.userId,
                },
                select: {
                    first_name: true,
                    last_name: true,
                    emailAddressId: true,
                },
            });
            clerkClient.emails.createEmail({
                fromEmailName: "info",
                body: `hola ${user?.first_name || ""} ${user?.last_name || ""} el usuario  ${input.authorName} ${input.authorLastName} ha creado un nuevo servicio
            Entra a este link para ver los detalles del servicio: solucionado-app.vercel.app${input.link || "servicios"}/${input.serviceId}
            `,
                subject: `Nuevo servicio creado`,
                emailAddressId: user?.emailAddressId as string,
            }).then((res) => {
                console.log(res)
            }
            ).catch((err) => {
                console.log(err)
            }
            );
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
                    service: {
                        connect: {
                            id: input.serviceId,
                        },
                    },
                },
            });
            return notification;
        }),



});