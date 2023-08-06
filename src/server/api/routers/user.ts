import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

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
      const userId = input.userId;
      console.log(userId);

      const user = await ctx.prisma.user.update({
        where: {
          externalId: userId,
        },
        data: {
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
      return user;
    }),
});
