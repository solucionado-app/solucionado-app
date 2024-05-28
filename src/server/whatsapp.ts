import { type MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { env } from "../env.mjs";
export const baseUrl = `${env.NEXT_PUBLIC_MP_DOMAIN}`;

export async function SendWhatsapp({ body, to }: { body: string; to: string }) {
  try {
    const res = await fetch(`${baseUrl}/api/whatsapp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body, to }),
    });
    const data = (await res.json()) as MessageInstance;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}


export async function SendWhatsappServiceRequest({
  variables,
  to,
}: {
  variables: {
    userName: string;
    requestedBy: string;
    categoryName: string;
    serviceRequestId: string;
  };
  to: string;
}) {
  try {
    const res = await fetch(`${baseUrl}/api/whatsappServiceRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ variables, to }),
    });
    const data = (await res.json()) as MessageInstance;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}