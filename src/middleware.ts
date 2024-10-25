import {  authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export default authMiddleware({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterAuth:  (auth, req, evt) => {

        if (!auth.isPublicRoute){
            if (auth.userId) {
              return NextResponse.next();
            }
            const url = new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url);
            return NextResponse.redirect(url)
        }
        if(req.nextUrl.pathname === '/registro/usuario' || req.nextUrl.pathname === '/registro/solucionador'  ){
            return NextResponse.next()
        }

    },
    publicRoutes: ["/", "/contacto", '/(login)(.*)','/(registro)(.*)','/registro/usuario','/registro/solucionador/', "/(solucionar/)(.*)", "/(api|trpc)(.*)", "/api/webhooks/mercadopago/autorization"],
    ignoredRoutes: ["/api/webhooks/mercadopago/autorization", "/api/webhooks/user"],
});



export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
