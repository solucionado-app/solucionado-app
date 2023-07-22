import { redirectToSignIn } from '@clerk/nextjs';
import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
    publicRoutes: ["/", "/contacto", "/login", "/registro", "/(solucionar)(.*)", "/(api|trpc)(.*)"],
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};
