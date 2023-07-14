import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes: ["/", "/conctacto"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};