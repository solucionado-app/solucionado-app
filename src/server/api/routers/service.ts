import { clerkClient } from "@clerk/nextjs/server";
import {  Status,  paymentStatus } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendFinishServiceEmail,  sendPaymentEmail } from "../../email";

const baseUrl = `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}`;

export const serviceRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string().optional(),
        status: z
          .enum([
            Status.PENDING,
            Status.REJECTED,
            Status.FINISHED,
            Status.ACEPTED,
          ])
          .optional(),
        paymentStatus: z.enum([
          paymentStatus.ACREDITADO,
          paymentStatus.ENVIADO,
          paymentStatus.PENDIENTE,
          paymentStatus.RECHAZADO,
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
  acredit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        price: z.number(),
        userId: z.string(),
        categoryName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const service = await ctx.prisma.service.update({
        where: {
          id: input.id,
        },
        data: {
          paymentStatus: paymentStatus.ACREDITADO,
        },
        include: {
          budget: {
            select: {
              id: true,
              author: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  cbu: true,
                },
              },
              serviceRequestId: true,
              serviceRequest: {
                select: {
                  address: true,
                  City: {
                    select: {
                      name: true,
                    },
                  },
                  user: {
                    select: {
                      id: true,
                      first_name: true,
                      last_name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const user = service?.budget.serviceRequest.user;
      const budgetAuthor = service?.budget.author;
      const notiData = {
        title: `Hemos enviado $${input.price} a tu cuenta, por tu servicio de ${input.categoryName}. Puedes ver el detalle de la transacción en tu cuenta.`,
        content: `Hemos enviado $${input.price} a tu cuenta, por tu servicio de ${input.categoryName}. Puedes ver el detalle de la transacción en tu cuenta.`,
        link: `${baseUrl ?? "https://solucionado.com.ar"}/servicios/${
          service.id
        }`,
        serviceRequestId: service.budget.serviceRequestId,
        userId: budgetAuthor?.id,
        budgetId: service?.budget.id,
        authorName: user?.first_name || "",
        authorLastName: user?.last_name || "",
        categoryName: input.categoryName,
      };
      await ctx.prisma.notification.create({
        data: {
          title: notiData.title,
          content: notiData.content,
          link: notiData.link,
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
          budget: {
            connect: {
              id: service?.budget.id,
            },
          },
        },
      });
      sendPaymentEmail({
        categorieName: notiData.categoryName,
        requestedByUsername: `${user.first_name ? user?.first_name : ""} ${
          user?.last_name ? user.last_name : ""
        } `,
        buttonText: "Ver solicitud",
        link: notiData.link,
        userName: budgetAuthor?.first_name ?? "",
        recipientMail: budgetAuthor?.email,
        price: input.price,
        cbu: budgetAuthor?.cbu ?? "01",
        address: service?.budget.serviceRequest.address as string,
        city: !!service?.budget.serviceRequest?.City
          ? service?.budget.serviceRequest?.City.name
          : "Neuquen",
      })
        .then((res) => {
          console.log("email sent", res);
        })
        .catch((e) => {
          console.log("error al enviar el mail", e);
        });

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
                  email: true,
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
  finish: protectedProcedure
    .input(
      z.object({
        serviceId: z.string(),
        categoryName: z.string(),
        price: z.number(),
        budgetAuthorId: z.string(),
        budgetAuthorFirstName: z.string(),
        budgetAuthorLastName: z.string(),
        budgetAuthorEmail: z.string(),
      })
    )
    .mutation(async({ ctx, input }) => {


      const service = await ctx.prisma.service.update({
        where: {
          id: input.serviceId,
        },
        data: {
          status: "FINISHED",
        },
        select: {
          id: true,
          City:{
            select:{
              name:true
            }
          },
          budget: {
            select: {
              id: true,
              user:{
                select:{
                  first_name:true,
                  last_name:true
                }
              },
              serviceRequestId: true,
              serviceRequest:{
                select:{
                  address:true
                }
              },
            },
          },
        },
      });

      const user = service?.budget.user;


      const notiData = {
        title: `Se ha marcado como completado tu servicio de ${input.categoryName} en breve te acreditaremos $${input.price} a tu cuenta.`,
        content: `Se ha marcado como completado tu servicio de ${input.categoryName} en breve te acreditaremos $${input.price} a tu cuenta.`,
        link: `${baseUrl ?? "https://solucionado.com.ar"}/servicios/${
          service.id
        }`,
        serviceRequestId: service?.budget.serviceRequestId,
        userId: input?.budgetAuthorId,
        budgetId: service?.budget.id,
        authorName: user?.first_name || "",
        authorLastName: user?.last_name || "",
        categoryName: input.categoryName,
      };
      await ctx.prisma.notification.create({
        data: {
          title: notiData.title,
          content: notiData.content,
          link: notiData.link,
          users: {
            connect: {
              externalId: input?.budgetAuthorId,
            },
          },
          author: {
            connect: {
              externalId: ctx.auth.userId,
            },
          },
          serviceRequest: {
            connect: {
              id: notiData.serviceRequestId,
            },
          },
          budget: {
            connect: {
              id: service?.budget.id,
            },
          },
        },
      });
      sendFinishServiceEmail({
        categorieName: notiData.categoryName,
        requestedByUsername: `${user?.first_name || ""} ${
          user?.last_name || ""
        } `,
        buttonText: "Ver solicitud",
        link: `https://solucionado.com.ar'/solicitudes-de-servicio/${notiData.serviceRequestId}`,
        userName: input.budgetAuthorFirstName  ?? "" + " " + input.budgetAuthorLastName ?? "",
        recipientMail: input.budgetAuthorEmail,
        price: input.price,
        address: service?.budget.serviceRequest.address as string,
        city: !!service?.City
          ? service?.City.name
          : "Neuquen",
      })
        .then((res) => {
          console.log("email sent", res);
        })
        .catch((e) => {
          console.log("error al enviar el mail", e);
        });


      return service;
    }),
  getEvery: protectedProcedure.query(async ({ ctx }) => {
    const organizationMemberships =
      await clerkClient.users.getOrganizationMembershipList({
        userId: ctx.auth.userId,
      });
    const userIsAdmin = organizationMemberships.some(
      (org) => org.organization.slug === "admin"
    );
    console.log(userIsAdmin);
    if (!userIsAdmin)
      throw new Error("No tienes permisos para realizar esta acción");
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
                cbu: true,
                cuit: true,
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
    return services;
  }),
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
  getSolucionadorServices: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        budget: {
          authorId: ctx.auth.userId,
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
          paymentStatus: "PENDIENTE",
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
