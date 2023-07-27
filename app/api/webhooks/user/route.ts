/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { prisma } from "~/server/db";
import { type IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, type WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json() as Record<string, unknown>;
  const headersList = headers();
  if (!headersList) {
    console.error("Headers not found");
    return NextResponse.json({}, { status: 400 });
  }
  const heads = {
    "svix-id": headersList?.get("svix-id"),
    "svix-timestamp": headersList?.get("svix-timestamp"),
    "svix-signature": headersList?.get("svix-signature"),
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.log("error")
    console.error("err", (err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;
    const emailId = attributes.primary_email_address_id as string;
    const { first_name, last_name, email_addresses: emailsList, phone, image_url } = attributes;
    let email = "";
    if (!!emailsList || (Array.isArray(emailsList) && emailsList.length === 0)) {

      Array.isArray(emailsList) && emailsList?.find((emailObj) => {
        if (emailObj.id === emailId) {
          email = emailObj.email_address as string;
        }
      });


    }
    console.log("user created or updated", id, attributes);
    console.log(email)

    await prisma.user.upsert({
      where: { externalId: id as string },
      create: {
        id: id as string,
        externalId: id as string,
        first_name: first_name as string,
        email: email,
        phone: phone as string,
        last_name: last_name as string,
        image_url: image_url as string,
        roleId: 1,
      },
      update: {
        externalId: id as string,
        first_name: first_name as string,
        email: email,
        phone: phone as string,
        last_name: last_name as string,
        image_url: image_url as string,
      },
    });
    return NextResponse.json({}, { status: 200 });


  }
  if (eventType === "user.deleted") {
    const { id, ...attributes } = evt.data;
    const emailId = attributes.primary_email_address_id as string;
    const { email_addresses: emailsList } = attributes;
    let email = "";
    if (!emailsList || (Array.isArray(emailsList) && emailsList.length === 0)) {

      Array.isArray(emailsList) && emailsList?.forEach((emailObj) => {
        if (emailObj.id === emailId) {
          email = emailObj.email_address as string;
        }
      });


    }
    console.log("user deleted", id, email);
    console.log("email", email);
    await prisma.user.delete({
      where: { externalId: id as string },
    });
    return NextResponse.json({}, { status: 200 });

  }

}

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;