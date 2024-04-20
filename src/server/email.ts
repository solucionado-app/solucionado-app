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
