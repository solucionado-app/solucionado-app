import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const provinceRouter = createTRPCRouter({

    findOrcreate: protectedProcedure.input(
        z.object({
            nombre: z.string(),
            id: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const findprovince = await ctx.prisma.province.findFirst({
            where: {
                id: input.id,
            },
        });
        if (findprovince) {
            return findprovince;
        }

        const province = await ctx.prisma.province.create({
            data: {
                name: input.nombre,
                id: input.id,
            },
        });
        return province;
    }),
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.province.findMany();
    }),
    getOne: protectedProcedure.input(
        z.object({
            id: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.province.findFirstOrThrow({
            where: {
                id: input.id,
            },
            select: {
                id: true,
                name: true,
                Citys: true,
            },
        });
    }),
    getCity: protectedProcedure.input(
        z.object({
            id: z.string(),
        })
    ).query(({ ctx, input }) => {
        return ctx.prisma.province.findMany({
            where: {
                Citys: {
                    some: {
                        id: input.id,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                Citys: true,
            },
        });
    }),


});