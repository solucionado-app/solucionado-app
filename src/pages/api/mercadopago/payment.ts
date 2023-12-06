/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        console.log(req.body);
        if (!req.body.access_token) {
            res.status(401).json({
                error: "No hay toquen de acceso",
            });
        }
        if (req.body.paymentType === "wallet_purchase" || req.body.paymentType === "onboarding_credits"){
            res.status(200).json({
                status: "success",
                status_detail: "accredited",
            });
        }
        console.log(req.body.formData.access_token);
        const payment_data = {
            description: req.body.formData.description || "Compra en Mercado Pago solucionado app",
            payment_method_id: req.body.formData.payment_method_id || "visa",
            installments: req.body.formData.installments || 1,
            payer: req.body.formData.payer,
            token: req.body.formData.token,
            transaction_amount: req.body.formData.transaction_amount || 0,
            capture: false,
            application_fee: req.body.formData.transaction_amount* 0.1 || 0,
            notification_url: `https://solucionado-app-git-dev-solucionado-app.vercel.app/api/webhooks/mercadopago/notificacion`,
            metadata: req.body.formData.metadata || {},
            // ...
        };
        console.log(payment_data)
        try {
            const response = await fetch('https://api.mercadopago.com/v1/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string}`,
                },
                body: JSON.stringify(payment_data),
            });
            console.log(await response.json())
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