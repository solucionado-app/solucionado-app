import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
    publicRoutes: ["/", "/contacto", "/(solucionar)(.*)", "/(api|trpc)(.*)", "/api/webhooks/mercadopago/autorization"],
    ignoredRoutes: ["/api/webhooks/mercadopago/autorization"],
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};
