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
            select:{
                id: true,
                description: true,
                price: true,
                estimatedAt: true,
                status: true,
                updatedAt: true,
                createdAt: true,
                author: {
                    select: {
                        id : true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                    }
                },
            }

        });

        if (serviceRequest === null) {
            throw new Error("Budget not found");
        }
        console.log(serviceRequest);
        return serviceRequest;
    }),
    getAll: protectedProcedure.input(
        z.object({
            serviceRequestId: z.string(),
        })
    ).query(({ ctx, input }) => {



        return ctx.prisma.budget.findMany({
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
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                    }
                },
            }

        });
    }),
    create: protectedProcedure.input(
        z.object({
            description: z.string(),
            price: z.number(),
            estimatedAt: z.date(),
            userId: z.string(),
            serviceRequestId: z.string(),
        })).mutation(({ ctx, input }) => {
            // const email = clerkClient.emails.createEmail({
            //     fromEmailName: "asdasd",
            //     emailAddressId: ctx.auth.user?.emailAddresses[0]?.id || "",
            //     subject: "Nuevo presupuesto",
            //     body: "Hay un nuevo presupuesto para tu solicitud de servicio",
            // })
            console.log(ctx.auth.userId)
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
});
