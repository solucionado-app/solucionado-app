import { redirectToSignIn } from '@clerk/nextjs';
import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
    afterAuth(auth, req) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req?.url }) as never;
        }

        return null;
    },
    publicRoutes: ["/", "/contacto", "/login", "/registro", "/(solucionar)(.*)", "/(api|trpc)(.*)"],
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],


};
