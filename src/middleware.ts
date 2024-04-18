import {  clerkClient } from '@clerk/nextjs';
import {  authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export default authMiddleware({
    afterAuth:  (auth, req, evt) => {
        // ...
        // if(auth.user?.phoneNumbers.length === 0){
        //     return NextResponse.redirect('/registro/usuario')
        // }
        // console.log('authed', auth.isPublicRoute, auth.userId, req.nextUrl.pathname)
        // const token = await auth.getToken()
        // console.log('token', token)
        // if(auth.isApiRoute && !!auth.userId){
        //     return NextResponse.next()
        // }
        if (!auth.userId && !auth.isPublicRoute){
            const url = new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url);
            return NextResponse.redirect(url)
        }
        if(req.nextUrl.pathname === '/registro/usuario' || req.nextUrl.pathname === '/registro/solucionador'  ){
            return NextResponse.next()
        }
        // try{
        //     if (!auth.userId && !auth.isPublicRoute) {
        //         const url = new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url);
        //         return NextResponse.redirect(url)
        //     }
        //     const user = await clerkClient.users.getUser(auth.userId as string)

        //     const userRole = user.unsafeMetadata?.role
        //     // console.log('user two', user.phoneNumbers)
        //     console.log('userRole', userRole, user.firstName, user.phoneNumbers.length)
        //     if (user.phoneNumbers.length === 0 && userRole === 'SOLUCIONADOR'){

        //         const register = new URL("/registro/solucionador/completar-perfil", req.url);
        //         console.log('entro', userRole, user.firstName, register, req.url)
        //          return NextResponse.redirect(register)
        //     }
        // }
        // catch(e){
        //     console.log('error de redirect',e)
        // }

    },
    publicRoutes: ["/", "/contacto", '/(login)(.*)','/(registro)(.*)','/registro/usuario','/registro/solucionador/', "/(solucionar/)(.*)", "/(api|trpc)(.*)", "/api/webhooks/mercadopago/autorization"],
    ignoredRoutes: ["/api/webhooks/mercadopago/autorization", "/api/webhooks/user"],
});



export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
