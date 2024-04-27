import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { type EmailServiceProps } from "@/src/emails/NewServiceEmail";
import FinishServiceEmail from "@/src/emails/FinishServiceEmail";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

export type EmailNewServiceData = EmailServiceProps & {
  recipientMail: string;
};

async function handler(request: NextRequest) {
  const {
    categorieName,
    requestedByUsername,
    buttonText,
    link,
    userName,
    recipientMail,
    price,
    address,
    city,
  } = (await request.json()) as EmailNewServiceData;

  const emailProps: EmailServiceProps = {
    categorieName: categorieName,
    requestedByUsername: requestedByUsername,
    buttonText: buttonText,
    link: link,
    userName: userName,
    price: price,
    address: address,
    city: city,
    // set other props here
  };
  console.log("emailProps", emailProps);
  const emailHtml = render(FinishServiceEmail(emailProps));
  const subject = `${requestedByUsername} ha liberado el pago para tu servicio de ${categorieName} en ${city}`;

  const sentFrom = new Sender("info@solucionado.com.ar", "Info");
  const recipients = [new Recipient(recipientMail, userName)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(emailHtml);

  try {
    const mailsent = await mailerSend.email.send(emailParams);
    console.log("email sent", mailsent);
    return NextResponse.json(mailsent, { status: 200 });
  } catch (e) {
    const body = e as {
      message: "The recipient domain gmail.com must be one of the verified domains. #MS42212";
      errors: { "": string }[];
    };
    console.log("error al enviar el mail", body);

    return NextResponse.json(e, { status: 400 });
  }
}

export const POST = handler;
