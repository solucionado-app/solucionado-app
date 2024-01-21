import { clerkClient } from "@clerk/nextjs/server";
import {  Status,  paymentStatus } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const serviceRouter = createTRPCRouter({
  update: protectedProcedure.input(
    z.object({
      id: z.string(),
      description: z.string().optional(),
      status: z.enum([Status.PENDING, Status.REJECTED, Status.FINISHED, Status.ACEPTED]).optional(),
      paymentStatus: z.enum([paymentStatus.ACREDITADO, paymentStatus.ENVIADO, paymentStatus.PENDIENTE, paymentStatus.RECHAZADO]),
    })
  ).mutation(async({ ctx, input }) => {
    const service = ctx.prisma.service.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        status: input.status,
        paymentStatus: input.paymentStatus,
      },
    });
    console.log(service);
    return service;
  })  ,
  acredit: protectedProcedure.input(
    z.object({
      id: z.string(),
      price:z.number(),
      userId:z.string(),
      categoryName:z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const service = await ctx.prisma.service.update({
      where: {
        id: input.id,
      },
      data: {
        paymentStatus: paymentStatus.ACREDITADO,
      },
    });

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.userId,
      },
      select: {
        cbu: true,
        cuit: true,
        first_name: true,
        last_name: true,
        emailAddressId: true,
      },
    });
    try{
      const email = await clerkClient.emails.createEmail({
        fromEmailName: "info",
        body: `Hola ${user?.first_name || ""} ${user?.last_name || ""} se ha acreditado el pago de tu servicio de ${input.categoryName} por un monto de $${input.price} en tu cuenta bancaria. Enlace al servicio: ${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'https:solucionado.com.ar'}/servicios/${input.id} `,
        subject: `Pago acreditado`,
        emailAddressId: user?.emailAddressId as string,
      })
      console.log(email)
    }
    catch(e){
      console.log(e)
    }

    return service;
  }),
  findById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          description: true,
          status: true,
          budget: {
            select: {
              id: true,
              price: true,
              author: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  image_url: true,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
    finish: protectedProcedure.input(
      z.object({
        serviceId: z.string(),
      })
    ).mutation(({ ctx, input }) => {
      return ctx.prisma.service.update({
        where: {
          id: input.serviceId,
        },
        data: {
          status: "FINISHED",
        },
      });
    }),
    getEvery: protectedProcedure.query(async ({ ctx }) => {

      const organizationMemberships = await clerkClient.users.getOrganizationMembershipList({userId: ctx.auth.userId});
      const userIsAdmin = organizationMemberships.some((org) => org.organization.slug === 'admin')
      console.log(userIsAdmin)
      if(!userIsAdmin) throw new Error("No tienes permisos para realizar esta acción")
      const services = ctx.prisma.service.findMany({
        orderBy: {
            createdAt: "desc",
        },

        select: {
          id: true,
          description: true,
          status: true,
          paymentStatus: true,
          budget: {
            select: {
              id: true,
              price: true,
              estimatedAt: true,
              author: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  image_url: true,
                  cbu:true ,
                  cuit:true ,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return services
    } ),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany({
      orderBy: {
          createdAt: "desc",
      },
      where: {
        budget: {
          userId: ctx.auth.userId,
        },
      },
      select: {
        id: true,
        description: true,
        status: true,
        budget: {
          select: {
            id: true,
            price: true,
            estimatedAt: true,
            author: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                image_url: true,
              },
            },
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        categoryId: z.number(),
        budgetId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.create({
        data: {
          name: input.title,
          budget: {
            connect: {
              id: input.budgetId,
            },
          },
          paymentStatus: 'PENDIENTE',
          description: input.description,
          category: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
    }),
});
