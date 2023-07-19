import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
export default authMiddleware({
    afterAuth(auth, req) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return redirectToSignIn({ returnBackUrl: req.url });
        }
    },
    publicRoutes: ['/', '/contacto', '/solucionar'],
    ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)", "/(api|trpc)(.*)"],

});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
