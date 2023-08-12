/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        console.log(req.body);
        if (req.body.paymentType === "wallet_purchase" || req.body.paymentType === "onboarding_credits"){
            res.status(200).json({
                status: "success",
                status_detail: "accredited",
            });
        }
        const payment_data = {
            amount: req.body.amount || 0,
            payment_method_id: req.body.payment_method_id || "visa",
            installments: req.body.installments || 1,
            payer: {
                email: 'test@test.com',
                first_name: 'Test',
                last_name: 'User',
                identification: {
                    type: 'CPF',
                    number: '19119119100'
                }
            },
            transaction_amount: req.body.transaction_amount || 0,
            // ...
        };

        try {
            const response = await fetch('https://api.mercadopago.com/v1/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string}`,
                },
                body: JSON.stringify(payment_data),
            });
            const { status, status_detail, id } = await response.json();
            res.status(response.status).json({ status, status_detail, id });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Internal server error",
            });
        }
    } else {
        res.status(405).json({
            error: "Method not allowed",
        });
    }
}