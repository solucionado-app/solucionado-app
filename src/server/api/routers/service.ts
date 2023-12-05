import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const serviceRouter = createTRPCRouter({
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
      return ctx.prisma.service.findMany({
        orderBy: {
            createdAt: "desc",
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
