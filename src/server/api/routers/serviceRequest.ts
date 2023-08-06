import { clerkClient } from "@clerk/nextjs";
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
            emailaddress: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {

        // ...
        console.log(ctx.auth)
        console.log(ctx.auth.user?.emailAddresses)

         const email = clerkClient.emails.createEmail({
             fromEmailName: "info",
             body: "Hay un nuevo presupuesto para tu solicitud de servicio",
             subject: "Nuevo presupuesto",
             emailAddressId: input.emailaddress,
         }).then((res) => {
             console.log(res)

         }).catch((err) => {
             console.log(err)
             });
        console.log(email)
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

        console.log(serviceRequest)
        const userswithCategory = await ctx.prisma.user.findMany({
            where: {
                categories: {
                    some: {
                        slug: input.categorySlug,
                    },
                },
            },
            select: {
                emailAddressId: true,
                first_name: true,
                last_name: true,

            },
        });
        if (userswithCategory?.length > 0) {
            userswithCategory.forEach((user) => {
                clerkClient.emails.createEmail({
                    fromEmailName: "info",
                    body: `Hola ${user.first_name || ""} ${user.last_name || ""} hay una nueva solicitud de servicio de ${serviceRequest.category.name} en tu zona.
                    Entra a este link para ver los detalles de la solicitud: solucionado-app.vercel.app/solicitudes-de-servicio/${serviceRequest.id}
                    `,
                    subject: `Solicitud de servicio en ${serviceRequest.category.name}`,
                    emailAddressId: user.emailAddressId as string,
                }).then((res) => {
                    console.log(res)
                }
                ).catch((err) => {
                    console.log(err)
                }
                );
            });
        }
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