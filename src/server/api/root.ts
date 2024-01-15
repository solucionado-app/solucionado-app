import { categorieRouter } from "~/server/api/routers/categorie";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { serviceRequestRouter } from "./routers/serviceRequest";
import { notificationRouter } from "./routers/notification";
import { budgetRouter } from "./routers/budget";
import { commentRouter } from "./routers/comment";
import { serviceRouter } from "./routers/service";
import { reviewRouter } from "./routers/review";
import { router } from "../trpcApprouter";
import { cityRouter } from "./routers/city";
import { provinceRouter } from "./routers/provice";

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
  service: serviceRouter,
  review: reviewRouter,
  city: cityRouter,
  province: provinceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;


export const appRouteRrouter = router({
  categories: categorieRouter,
  user: userRouter,
  serviceRequest: serviceRequestRouter,
  notification: notificationRouter,
  budget: budgetRouter,
  comment: commentRouter,
  service: serviceRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouteRrouter = typeof appRouteRrouter;