import { categorieRouter } from "~/server/api/routers/categorie";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { serviceRequestRouter } from "./routers/serviceRequest";
import { notificationRouter } from "./routers/notification";
import { budgetRouter } from "./routers/budget";
import { commentRouter } from "./routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categories: categorieRouter,
  user: userRouter,
  serviceRequest: serviceRequestRouter,
  notification: notificationRouter,
  budget: budgetRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
