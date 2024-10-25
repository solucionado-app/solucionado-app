import {  authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    publicRoutes: ["/", "/contacto", '/(login)(.*)','/(registro)(.*)','/registro/usuario','/registro/solucionador/', "/(solucionar/)(.*)", "/(api|trpc)(.*)", "/api/webhooks/mercadopago/autorization"],
    ignoredRoutes: ["/api/webhooks/mercadopago/autorization", "/api/webhooks/user"],
});



export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
