import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { type EmailRequestProps } from '@/src/emails/NewServiceRequestEmail';
import NewServiceRequestEmail from '@/src/emails/NewServiceRequestEmail'
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || '',
});

async function handler(request: Request) {

const {categorieName,requestedByUsername,buttonText,content,link,title,userName ,recipientMail } = await request.json() as EmailRequestProps &{recipientMail:string};

const emailProps: EmailRequestProps = {
    categorieName: categorieName,
    requestedByUsername: requestedByUsername,
    buttonText: buttonText,
    content: content,
    link: link,
    title: title,
    userName: userName
    // set other props here
};
const emailHtml = render(NewServiceRequestEmail(emailProps));


const sentFrom = new Sender("info@solucionado.com.ar", "Info");
const recipients = [
    new Recipient(recipientMail, userName)
];

const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(`Nueva solicitud de servicio de ${categorieName} en tu zona`)
    .setHtml(emailHtml)

 try {
    const mailsent= await mailerSend.email.send(emailParams);
    console.log('email sent', mailsent)
     return NextResponse.json(mailsent, { status: 200 });

}
    catch(e){
     const body =  e as {
         message: 'The recipient domain gmail.com must be one of the verified domains. #MS42212',
         errors: { '': string } []
     }
     console.log('error al enviar el mail', body)

     return NextResponse.json(e, { status: 400 });
    }


}

export const GET = handler;
export const POST = handler;
export const PUT = handler;