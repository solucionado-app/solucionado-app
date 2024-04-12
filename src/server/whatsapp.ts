

import { type MessageInstance } from "twilio/lib/rest/api/v2010/account/message";


export async function SendWhatsapp({body, to} :{body: string, to: string}) {
    try{
        const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({body, to}),
        });
        const data = await res.json() as MessageInstance;
        return data;
    }
    catch(err){
        console.log(err);
        return err
    }

}