
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { type EmailRequestProps } from '@/src/emails/NewServiceRequestEmail';
import NewServiceRequestEmail from '@/src/emails/NewServiceRequestEmail'
import NewBudgetEmail from '@/src/emails/NewBudgetEmail'

import { render } from "@react-email/render";

type EmailRequestData = EmailRequestProps & {
    recipientMail: string;
    type: 'serviceRequest' | 'budget' | 'comment' | 'payment' ;
};

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || '',
});
export const sendEmail = async ({ categorieName, requestedByUsername, buttonText, link, userName, recipientMail , type }: EmailRequestData) => {
    const emailProps: EmailRequestProps = {
    categorieName: categorieName,
    requestedByUsername: requestedByUsername,
    buttonText: buttonText,
    link: link,
    userName: userName
    // set other props here
    };
        let emailHtml = render(NewServiceRequestEmail(emailProps));
    let subject = `Nueva solicitud de servicio de ${categorieName} en tu zona`;
    if( type && type === 'budget'){
        emailHtml = render(NewBudgetEmail(emailProps));
        subject = `Nuevo presupuesto en tu solicitud de ${categorieName}`;
    }
    else if(type && type === 'payment'){
        emailHtml = render(NewBudgetEmail(emailProps));
        subject = `Nuevo pago en tu solicitud de ${categorieName}`;
    }

const sentFrom = new Sender("info@solucionado.com.ar", "Info");
const recipients = [
    new Recipient(recipientMail, userName)
];

const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(emailHtml)

 try {
    const mailsent= await mailerSend.email.send(emailParams);
    // console.log('email sent', mailsent)
     return mailsent;

}
    catch(e){
     const body =  e as {
         message: 'The recipient domain gmail.com must be one of the verified domains. #MS42212',
         errors: { '': string } []
     }
     console.log('error al enviar el mail', body)

     return e;
    }
}