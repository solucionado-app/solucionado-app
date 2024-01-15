import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const cityRouter = createTRPCRouter({
    findOrcreate : protectedProcedure.input(
        z.object({
            nombre: z.string(),
            id: z.string(),
            provinceId: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const findCity = await ctx.prisma.city.findFirst({
            where: {
                id: input.id,
            },
        });
        if (findCity) {
            return findCity;
        }
        const city = await ctx.prisma.city.create({
            data: {
                name: input.nombre,
                id: input.id,
                Province: {
                    connect: {
                        id: input.provinceId,
                    },
                }
            },
        });
        return city;
    }),
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.city.findMany();
    }),
    getOne: protectedProcedure.input(
        z.object({
            id: z.string(),
        })
    ).query(({ ctx,input }) => {
        return ctx.prisma.city.findMany({
            where: {
                id: input.id,
            },
            select: {
                id: true,
                name: true,
                Province: true,
            },
        });
    }),
    getProvince: protectedProcedure.input(
        z.object({
            provinceId: z.string(),
        })
    ).query(({ ctx,input }) => {
        return ctx.prisma.city.findMany({
            where: {
                Province: {
                    id: input.provinceId,
                },
            },
            select: {
                id: true,
                name: true,
                Province: true,
            },
        });
    }),


});