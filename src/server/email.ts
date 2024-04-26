import { type EmailNewServiceData } from "@/app/api/mail/newService/route";
import { EmailPaymentData } from "@/app/api/mail/payment/route";
import { type EmailRequestData } from "@/app/api/mail/serviceRequest/route";
import { env } from "@/src/env.mjs";

const baseUrl = `${env.NEXT_PUBLIC_MP_DOMAIN}`;

export const sendEmail = async (data: EmailRequestData) => {
  return fetch(`${baseUrl}/api/mail/serviceRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => console.log("done"));
};


export const sendNewServiceEmail = async (data: EmailNewServiceData) => {
  return fetch(`${baseUrl}/api/mail/newService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => console.log("done"));
};

export const sendPaymentEmail = async (data: EmailPaymentData) => {
  return fetch(`${baseUrl}/api/mail/newService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => console.log("done"));
};


export const sendFinishServiceEmail = async (data: EmailNewServiceData) => {
  return fetch(`${baseUrl}/api/mail/finishService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => console.log("done"));
};
