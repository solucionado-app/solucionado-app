import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
    findByRequestId: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string(),
        })
    ).query(({ ctx, input }) => {

        const serviceRequest = ctx.prisma.comment.findMany({
            where: {
                serviceRequestId: input.serviceRequestId,
            },
        });

        if (serviceRequest === null) {
            throw new Error("comment not found");
        }
        // console.log(serviceRequest);
        return serviceRequest;
    }),
    getNumberOfCommentsRequest: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string().optional(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.comment.count({
            where: {
                  serviceRequestId: input.serviceRequestId,
            },
        });
    }),
    getNumberOfCommentsService: protectedProcedure.input(
        z.object({
            serviceId: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.comment.count({
            where: {
                serviceId: input.serviceId,
            },
        });
    }),
    getNumberOfCommentsUser: protectedProcedure.input(
        z.object({

            userId: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.comment.count({
            where: {
                userId: input.userId,
            },
        });
    }),
    getAllByRequestId: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.comment.findMany({
            where: {
                    serviceRequestId: input.serviceRequestId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
            }
        });
    }),
    getAllByServiceId: protectedProcedure.input(
        z.object({
            serviceId: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.comment.findMany({
            where: {
                    serviceId: input.serviceId,
            },
            orderBy: {
                createdAt: "asc",
            },
            select:{
                id: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                    }
                },
                createdAt: true,
            }
        });
    }),
    getAllByUserId: protectedProcedure.input(
        z.object({
            userId: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.comment.findMany({
            where: {
                userId: input.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
            }
        });
    }),
    create: protectedProcedure.input(
        z.object({
            description: z.string(),
            userId: z.string().optional(),
            serviceRequestId: z.string().optional(),
            serviceId: z.string().optional(),
        })).mutation(({ ctx, input }) => {

            const requestConect = {
                serviceRequest: {
                    connect: {
                        id: input?.serviceRequestId,
                    },
                }
            }
            const serviceConnect = {
                service: {
                    connect: {
                        id: input?.serviceId,
                    },
                }
            }
            const userConect = {
                user: {
                    connect: {
                        id: input?.userId,
                    },
                }
            }


            // console.log(ctx.auth.userId)
            return ctx.prisma.comment.create({
                data: {
                    content: input.description,

                    author: {
                        connect: {
                            externalId: ctx.auth.userId,
                        },
                    },
                    ...input.userId ? userConect : null,
                    ...input.serviceRequestId ? requestConect : null,
                    ...input.serviceId ? serviceConnect : null,

                },
            });
        }),
});
