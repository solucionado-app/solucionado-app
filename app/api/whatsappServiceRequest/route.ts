import { env } from "@/src/env.mjs";
import { type NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  const { variables, to } = (await request.json()) as {
    variables: {
      userName: string;
      requestedBy: string;
      categoryName: string;
      serviceRequestId: string;
    };
    to: string;
  };
  const accountSid = env.TWILIO_ACCOUNT_SID;
  const authToken = env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  try {
    console.log(variables);
    if (!variables) {
      throw new Error("Invalid request", { cause: "No data provided" });
    }
    let whatsapp = to;
    if (!whatsapp.startsWith("+549")) {
      whatsapp = "+549" + whatsapp;
    }
    const message = await client.messages.create({
      contentSid: "HX9f0891021411531d0385271fcd07ca49",
      from: "whatsapp:+5492984153058",
      messagingServiceSid: "MG5482515b6c4551980414c1e899aac954",
      to: `whatsapp:${whatsapp}`,
      contentVariables: JSON.stringify({
        UserName: variables.userName,
        RequestedBy: variables.requestedBy,
        CategoryName: variables.categoryName,
        ServiceRequestId: variables.serviceRequestId,
      }),
    });

    console.log(message);
    return NextResponse.json(message, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
