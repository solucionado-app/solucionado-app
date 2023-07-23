import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const serviceRequestRouter = createTRPCRouter({
    getAll: publicProcedure.input(z.object({
        userId: z.string(),
    })).query(({ ctx, input }) => {
        return ctx.prisma.serviceRequest.findMany({
            where: {
                userId: input.userId,
            },
            include: {
                category: true,
            }
});
    }),
    create: publicProcedure.input(
        z.object({
            userId: z.string(),
            status: z.string().optional(),
            details: z.record(z.string(), z.any()).optional(),
            categorySlug: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const userId = input?.userId;
        console.log(userId);

        const serviceRequest = await ctx.prisma.serviceRequest.create({
            data: {
                status: "PENDING",
                details: input.details,
                user: {
                    connect: {
                        externalId: userId,
                    },
                },
                category: {
                    connect: {
                        slug: input.categorySlug,
                    },
                },
            }
        });
        return serviceRequest;

    }),

});