import {type NextApiRequest, type NextApiResponse } from "next";
import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.MP_SECRET_TOKEN as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("entro", req)
    if (req.method === "POST") {

        const preference = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                },
            ],
            back_urls: {
                success: "http://localhost:3000",
                failure: "http://localhost:3000",
                pending: "",
            },
            auto_return: "approved",
        };

        try {
            const response = await mercadopago.preferences.create(preference);
            res.status(200).json({
                id: response.body.id,
            });
        } catch (error) {
            console.log(error);
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