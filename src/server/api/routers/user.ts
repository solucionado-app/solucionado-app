import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getById: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.auth.userId;
    if (!userId) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    const currentUser = ctx.prisma.user.findUnique({
      where: { externalId: ctx.auth.userId },
    });
    return currentUser;
  }),
  getSolucionadorProfileInfoById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id, role: "SOLUCIONADOR" },
        select: {
          email: true,
          address: true,
          first_name: true,
          last_name: true,
          image_url: true,
          phone: true,
        },

      });
      const {_avg: {rating : average}} = await ctx.prisma.review.aggregate({
        where: {
          userId: input.id,
        },
        _avg: {
          rating: true,
        },
      });
      const rating = Number(average);
      const countReviews = await ctx.prisma.review.count({
        where: {
          userId: input.id,
        },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return { user, rating, countReviews};
    }),
  update: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        dni: z.string().optional(),
        cbu: z.string().optional(),
        cuit: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        categories: z
          .array(
            z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
            })
          )
          .optional(),
        role: z.enum(["USER", "SOLUCIONADOR"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {

      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          externalId: ctx.auth.userId,
          phone: input.phone,
          dni: input?.dni,
          address: input?.address,
          cbu: input?.cbu,
          cuit: input?.cuit,
          role: input?.role,
          categories: {
            connect: input?.categories?.map((category) => {
              return {
                id: category.id,
              };
            }),
          },
        },
      });
      console.log(user);
      if(input?.role) await clerkClient.users.updateUserMetadata(input.userId, {
        publicMetadata: {
          role: input?.role
        }
      })
      return user;
    }),
});
