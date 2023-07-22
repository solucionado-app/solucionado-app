import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./root";
import superjson from "superjson";
import { createInnerTRPCContext } from "./trpc";
import { type SignedInAuthObject, type SignedOutAuthObject } from "@clerk/nextjs/dist/types/server";



export function ssgHelper(auth: SignedInAuthObject | SignedOutAuthObject) {
    return createServerSideHelpers({
        router: appRouter,
        ctx: createInnerTRPCContext({ auth, revalidateSSG: null }),
        transformer: superjson,
    });
}