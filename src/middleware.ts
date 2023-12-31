import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
    publicRoutes: ["/", "/contacto", '/(login)(.*)','/(registro)(.*)', "/(solucionar/)(.*)", "/(api|trpc)(.*)", "/api/webhooks/mercadopago/autorization"],
    ignoredRoutes: ["/api/webhooks/mercadopago/autorization", "/api/webhooks/user", '/'],
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
