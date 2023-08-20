import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

async function handler(request:Request) {
    const payload = await request.json()  as { action:string ,type: string, data: { id: string } };
    const { type, data: { id }, action } = payload;
    console.log(id, type);
    console.log(payload);
    if(type === 'payment' || type === 'refund'){
        try {
            const responseCompra = await fetch(
                `https://api.mercadopago.com/v1/payments/${id}`,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string}`,
                    },
                }
            );
            console.log(responseCompra)
            if (!responseCompra.ok) {
                throw new Error(`HTTP error! status: ${responseCompra.status}`);
            }
            const data = await responseCompra.json() as { metadata: { budget_id: string, description: string }, status: string, status_detail: string };
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
                    serviceRequestId: true,
                    user: {
                        select: {
                            email: true,
                            first_name: true,
                            last_name: true,

                        },
                    },
                    serviceRequest: {
                        select: {
                            categoryId: true,
                        }
                    }
                },
            });


            console.log(budget);
            console.log(type, data.status_detail, data.status);
            if (budget && type === 'payment' && data.status === 'approved' && data.status_detail === 'accredited') {
                const budgetAprobbed = await prisma.budget.update({
                    where: {
                        id: budget.id,
                    },
                    data: {
                        status: 'ACEPTED',
                        status_detail: data.status_detail,
                    },
                });
                console.log(budgetAprobbed);
                await prisma.serviceRequest.update({
                    where: {
                        id: budget.serviceRequestId,
                    },
                    data: {
                        status: 'ACEPTED',
                    },
                });
                try {
                    const newService = await prisma.service.create({
                        data: {
                            name: data.metadata.description,
                            budget: {
                                connect: {
                                    id: budget.id,
                                }
                            },
                            description: data.metadata.description,
                            category: {
                                connect: {
                                    id: budget.serviceRequest.categoryId,
                                }
                            },
                        },
                    });
                    console.log(newService);

                }
                catch (error) {
                    console.log(error);
                }
                return NextResponse.json({}, { status: 200 });
            } else if (budget && type === 'refund') {
                await prisma.budget.update({
                    where: {
                        id: data.metadata.budget_id,
                    },
                    data: {
                        status: 'PENDING',
                        status_detail: data.status_detail,
                    },
                });

            }

        }
        catch (error) {
            console.log(error);
        }
    }
    else if (type === 'mp-connect' && action === 'application.authorized'){
        console.log(payload);

    }

    return  NextResponse.json({}, { status: 200 });
}
export const POST = handler;

