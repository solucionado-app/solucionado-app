import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes: ["/", "/conctacto", "/registro/authenticathed", "/registro/usuario"],
    ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)", "/(api|trpc)(.*)"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};