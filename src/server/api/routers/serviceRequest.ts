
import { Status } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";





export const serviceRequestRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        categories: z.array(z.object({
            id: z.string(),
            name: z.string(),
            slug: z.string(),
        })).optional(), // <-- "filter" is optional
        provinceId: z.string().optional(), // <-- "filter" is optional
        cityId: z.string().optional(), // <-- "filter" is optional
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        direction: z.enum(["forward", "backward"]).optional(), // optional, useful for bi-directional query
      })
    )
    .query(async({ input,ctx }) => {

        const {  cursor, categories, cityId, provinceId } = input;
        const limit = input.limit ?? 25;
        const where = {
            status: "PENDING" as Status,
          Province: {},
          City: {},
          categoryId: {},
        }
        if(!provinceId || !cityId || !categories){
            const user = await ctx.prisma.user.findUnique({
                where: {
                  externalId: ctx.auth.userId,
                },
                include: {
                  City: true,
                  Province: true,
                  categories: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                    },
                },
                },
              });
              if (user?.City) {
                where.City = { id: user.City.id };
              }
              if (user?.Province) {
                where.Province = { id: user.Province.id };
              }
                if (user?.categories) {
                    where.categoryId = {
                    in: user.categories.map((category) => category.id),
                    };
                }
        }


        if (provinceId) {
          where.Province = { id: provinceId };
        }

        if (cityId) {
          where.City = { id: cityId };
        }

        if (categories && categories.length > 0) {
          where.categoryId = {
            in: categories.map((category) => category.id),
          };
        }
      const serviceRequestItems = await ctx.prisma.serviceRequest.findMany({
        take: (limit ?? 10) + 1,
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        where,
        select: {
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
          City: true,
          Province: true,
          photos: true,
          portrait: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (serviceRequestItems.length > limit) {
        const nextItem = serviceRequestItems.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return { serviceRequestItems, nextCursor };
    }),
  getUserRequest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.serviceRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: ctx.auth.userId,
      },
      select: {
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
        City: true,
        Province: true,
        photos: true,
        portrait: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        status: z.string().optional(),
        details: z.record(z.string(), z.any()).optional(),
        categorySlug: z.string(),
        date: z.date().optional(),
        description: z.string().optional(),
        provinceId: z.string().optional(),
        cityId: z.string().optional(),
        cityName: z.string().optional(),
        address: z.string().optional(),
        amount: z.string().optional(),
        schedule: z.string().optional(),
        urgency: z.string().optional(),
        emailaddress: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // ...
      // console.log(ctx.auth)
      // console.log(ctx.auth.user?.emailAddresses)

      // console.log(email)
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
          City: {
            connect: {
              id: input.cityId,
            },
          },
          Province: {
            connect: {
              id: input.provinceId,
            },
          },
          address: input.address,
          amount: input.amount,
          schedule: input.schedule,
          urgency: input.urgency,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      // console.log(serviceRequest)

      return serviceRequest;
    }),
  findById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
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
          City:{
            select:{
              name: true,
            }
          },
          Province:{
            select:{
              name: true,
            }
          },
          photos: true,
          portrait: true,
        },
      });
    }),
});