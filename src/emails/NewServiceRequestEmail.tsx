import React from 'react';
import { Tailwind, Button } from "@react-email/components";

interface EmailTemplateProps {
    title: string;
    content: string;
    link: string;
    buttonText: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ title = 'Hola', content = 'Hay una nueva solicitud de servicio de', link = 'https://solucionado.com.ar/solicitudes-de-servicio/', buttonText = 'ver solicitud' }) => {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            brand: "#007291",
                        },
                    },
                },
            }}
        >
            <div className="bg-gray-100 p-5">
                <div className="max-w-lg mx-auto bg-white p-5 rounded-md">
                    <h1 className="text-xl text-gray-700">{title}</h1>
                    <p className="text-gray-700">{content}</p>
                    <Button
                        href={link}
                        className="inline-block bg-blue-500 text-white px-4 py-2 mt-5 rounded-md text-decoration-none"
                    >
                        {buttonText}
                    </Button>

                </div>
            </div>

        </Tailwind>
    );
};

export default EmailTemplate;


