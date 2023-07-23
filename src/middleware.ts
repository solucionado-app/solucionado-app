import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
    publicRoutes: ["/", "/contacto", "/(solucionar)(.*)", "/(api|trpc)(.*)"],
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};
