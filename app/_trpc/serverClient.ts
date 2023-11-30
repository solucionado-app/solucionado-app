import { appRouteRrouter } from "@/src/server/api/root";
import { httpBatchLink } from "@trpc/client";


export const serverClient = appRouteRrouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});