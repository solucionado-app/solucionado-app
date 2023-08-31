import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "~/server/db";


async function handler(request: NextRequest) {
    console.log('entro', request.nextUrl.searchParams.get('code'))
    console.log('client id', process.env.NEXT_PUBLIC_MP_CLIENT_ID as string)
    console.log('secret', process.env.NEXT_PUBLIC_MP_CLIENT_SECRET as string)
    const code = request.nextUrl.searchParams.get('code')
    const userId = request.nextUrl.searchParams.get('state')
    try{
      const token =  await fetch(
            `https://api.mercadopago.com/oauth/token`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string}`,
                },
                body: JSON.stringify({
                    client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID as string,
                    client_secret: process.env.NEXT_PUBLIC_MP_CLIENT_SECRET as string,
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: `${process.env.NEXT_PUBLIC_MP_DOMAIN as string}/api/webhooks/mercadopago/autorization`,
                })
            }
        );
        console.log(token)
        if(token.status !== 200){
            throw new Error(`HTTP error! status: ${token.status}  ${JSON.stringify(token)}  `);
        }

        const data = await token.json() as { access_token: string, refresh_token: string, user_id: string, public_key: string, live_mode: boolean, token_type: string, expires_in: number };
        const { access_token, refresh_token, user_id, public_key, live_mode, token_type, expires_in } = data;
        console.log(data)
        await prisma.user.update({
            where: {
                id: userId || '',
            },
            data: {
                mpCode: {
                    access_token,
                    refresh_token,
                    public_key,
                    expires_in,
                    user_id,
                }
            }
        })
        redirect('/perfil')

    }
    catch (error){
        console.log('erorr', error)
        redirect(`/completar-perfil?`)
    }

}

export const GET = handler;