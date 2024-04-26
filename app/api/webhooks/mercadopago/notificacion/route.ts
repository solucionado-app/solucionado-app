import { sendNewServiceEmail } from "@/src/server/email";
import { baseUrl, SendWhatsapp } from "@/src/server/whatsapp";
import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

async function handler(request: Request) {
  const payload = (await request.json()) as {
    action: string;
    type: string;
    data: { id: string };
  };
  if (!payload.data?.id) return NextResponse.json({}, { status: 200 });
  const {
    type,
    data: { id },
    action,
  } = payload;
  console.log(id, type);
  console.log(payload);
  if (type === "payment" || type === "refund"  ) {
    try {
      const responseCompra = await fetch(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string
            }`,
          },
        }
      );
      console.log(responseCompra);
      if (!responseCompra.ok) {
        throw new Error(`HTTP error! status: ${responseCompra.status}`);
      }
      const data = (await responseCompra.json()) as {
        metadata: { budget_id: string; description: string };
        status: string;
        status_detail: string;
      };
      console.log(data);
      console.log(data.metadata);
      if (!data.metadata) {
        throw new Error(`HTTP error! status: ${responseCompra.status}`);
      }
      const budget = await prisma.budget.findUnique({
        where: {
          id: data.metadata.budget_id,
        },
        select: {
          id: true,
          price: true,
          status: true,
          serviceRequestId: true,
          author: {
            select: {
              email: true,
              first_name: true,
              last_name: true,
              phone: true,
            },
          },
        },
      });

      if (
        budget &&
        type === "payment" &&
        data.status === "approved" &&
        data.status_detail === "accredited" &&
        budget.status === "PENDING"
      ) {
         await prisma.budget.update({
          where: {
            id: budget.id,
          },
          data: {
            status: "ACEPTED",
            status_detail: data.status_detail,
          },

        });
        const serviceRequest = await prisma.serviceRequest.update({
          where: {
            id: budget.serviceRequestId,
          },
          data: {
            status: "ACEPTED",
          },
          select: {
            id: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            address: true,
            City: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        });
        try {
          const newService = await prisma.service.create({
            data: {
              name: data.metadata.description,
              budget: {
                connect: {
                  id: budget.id,
                },
              },
              description: data.metadata.description,
              category: {
                connect: {
                  id: serviceRequest.category.id,
                },
              },
            },
          });
          let whatsapp = budget.author.phone;

          if (!!whatsapp) {
            if (!whatsapp.startsWith("+549")) {
              whatsapp = "+549" + whatsapp;
            }
            await SendWhatsapp({
              body: `Se ha aceptado un presupuesto que enviaste para una solicitud de servicio en solucionado`,
              to: `whatsapp:${whatsapp}`,
            });
          }
          await sendNewServiceEmail({
            categorieName: serviceRequest.category.name,
            requestedByUsername: `${
              serviceRequest.user.first_name as string
            } ${serviceRequest.user.last_name as string}`,
            buttonText: "Ver servicio",
            link: `${baseUrl}/service/${newService.id}`,
            userName: `${budget.author.first_name as string} ${
              budget.author.last_name as string
            }`,
            recipientMail: budget.author.email,
            price: budget.price,
            city: serviceRequest?.City
              ? serviceRequest?.City.name
              : "Neuquen",
            address: serviceRequest.address as string,
          });
        } catch (error) {
          console.log(error);
        }
        return NextResponse.json({}, { status: 200 });
      } else if (budget && type === "refund") {
        await prisma.budget.update({
          where: {
            id: data.metadata.budget_id,
          },
          data: {
            status: "PENDING",
            status_detail: data.status_detail,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else if (type === "mp-connect" && action === "application.authorized") {
    console.log(payload);
  }

  return NextResponse.json({}, { status: 200 });
}
export const POST = handler;
