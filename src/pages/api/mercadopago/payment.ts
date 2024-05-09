/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        console.log(req.body);

        try {
            const IdempotencyKey = uuid();
            const response = await fetch(
              "https://api.mercadopago.com/v1/payments",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Idempotency-Key": IdempotencyKey,

                  Authorization: `Bearer ${
                    process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string
                  }`,
                },
                body: JSON.stringify(req.body),
              }
            );
            const paymentData =await response.json()
            console.log(paymentData)
            res.status(response.status).json({ data: paymentData });
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