import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendEmail } from "../../email";
const baseUrl = `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}`;


export const notificationRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.notification.findMany({
            orderBy: {
                createdAt: 'desc',
            },
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
    findByServiceRequestId: protectedProcedure.input(
        z.object({
            serviceRequestId : z.string(),
        })
    ).query(async ({ ctx, input }) => {
        const notification = await ctx.prisma.notification.findFirstOrThrow({
            where: {
                serviceRequestId: input.serviceRequestId,
            },
        });
        return notification;
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
            categoryId: z.number(),
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
                email: true,
            },
        });

        const category = await ctx.prisma.category.findUnique({
            where: {
                id: input.categoryId,
            },
            select:{
                name: true,
            }
        })
        sendEmail({
                categorieName: category?.name as string,
                requestedByUsername: `${input.authorName ?? ''}  ${input.authorLastName ?? ''}`,
                buttonText: 'Ver solicitud',
                link: `${baseUrl ?? 'https://solucionado.com.ar'}/solicitudes-de-servicio/${input.serviceRequestId}`,
                userName: user?.first_name ?? '',
                recipientMail: user?.email as string,
                type: 'budget',
            }).then((res) => {
            console.log('email sent', res)
            }).catch((e) => {
                            console.log('error al enviar el mail', e)
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
    createServicePayment: protectedProcedure.input(
        z.object({
            link: z.string().optional(),
            title: z.string(),
            content: z.string(),
            budgetId: z.string(),
            serviceRequestId: z.string(),
            userId: z.string(),
            authorName: z.string(),
            authorLastName: z.string(),
            categoryId: z.number(),
            categoryName: z.string(),
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
                email: true,
            },
        });

        const category = await ctx.prisma.category.findUnique({
            where: {
                id: input.categoryId,
            },
            select:{
                name: true,
            }
        })

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
        sendEmail({
                categorieName: category?.name as string,
                requestedByUsername: `${input.authorName ?? ''}  ${input.authorLastName ?? ''}`,
                buttonText: 'Ver solicitud',
                link: `${baseUrl ?? 'https://solucionado.com.ar'}/solicitudes-de-servicio/${input.serviceRequestId}`,
                userName: user?.first_name ?? '',
                recipientMail: user?.email as string,
                type: 'payment',
            }).then((res) => {
            console.log('email sent', res)
            }).catch((e) => {
                            console.log('error al enviar el mail', e)
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


        const notification = await ctx.prisma.notification.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                users: {
                    connect: filteredUsers?.length > 0 ? filteredUsers?.map((user?) => {
                        return {
                            id: user?.id,
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
            serviceRequestId: z.string(),
            content: z.string(),
            title: z.string(),
            link: z.string().optional(),
            cityId: z.string().optional(),
            categoryName: z.string().optional(),
        })
    ).mutation(async ({ ctx, input }) => {
        const existingNotification = await ctx.prisma.notification.findFirst({
            where: {
                serviceRequestId: input.serviceRequestId,
            },
        });

        // If a notification already exists, return an error or ignore the request
        if (!!existingNotification) {
            throw new Error('Ya existe una notificacion para este servicio.');
        }
        const users = await ctx.prisma.user.findMany({
            where: {
                categories: {
                    some: {
                        slug: input.categorySlug,
                    },
                },
                City: {
                    id: input.cityId,
                },
            },
        });
        console.log('creando notificacion, existe ya una:', existingNotification);

        if (!existingNotification){
        const notification = await ctx.prisma.notification.create({
            data: {
                title: input.title,
                content: input.content,
                link: input.link,
                users: {
                    connect: users?.length > 0 ? users?.map((user?) => {
                        return {
                            id: user?.id,
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
            select:{
                author: true,
            }
        });


            if (users?.length > 0) {


                users.forEach((user) => {
                    console.log('user', user.email)
                    if (!!user.email) {
                        sendEmail({
                            categorieName: input.categoryName as string,
                            requestedByUsername: `${notification?.author.first_name ?? ''}  ${notification?.author.last_name ?? ''}`,
                            buttonText: 'Ver solicitud',
                            link: `${baseUrl ?? 'https://solucionado.com.ar'}/solicitudes-de-servicio/${input.serviceRequestId}`,
                            userName: user.first_name ?? '',
                            recipientMail: user.email,
                            type: 'serviceRequest',
                        }).then((res) => {
                            console.log('email sent', res)
                        }).catch((e) => {
                            console.log('error al enviar el mail', e)
                        });
                    }

                });
            }
        return notification;
    }
    else{
        return null;
    }

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