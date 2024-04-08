import { env } from "@/src/env.mjs";
import { type NextRequest, NextResponse } from "next/server";
import twilio from 'twilio';

export async function POST(request : NextRequest) {
const {body, to} = await request.json() as {body: string, to: string} ;
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
try{
    console.log(body);
    if(!body){
        throw new Error('Invalid request', {cause: 'No data provided'});
    }

   const message = await client.messages
      .create({
         from: 'whatsapp:+5492984153058',
         body: body,
         to: to,
       })

    console.log(message.sid);
    return NextResponse.json( { statusText: 'succes' , message: message}, { status: 200 })
}
catch(err){
    console.log(err);
    return NextResponse.json( { error: err }, { status: 500 })
}

}