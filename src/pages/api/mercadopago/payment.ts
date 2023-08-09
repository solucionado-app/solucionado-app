/* eslint-disable */
import mercadopago, { payment } from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";

mercadopago.configure({
    access_token: process.env.MP_SECRET_TOKEN as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
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
            const response = await mercadopago.payment.save(payment_data);
            const { status, status_detail, id } = response.body;
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