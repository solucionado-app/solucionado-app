import React from 'react';
import { Tailwind, Button, Body, Container, Heading, Section, Text, Link, Img, Hr } from "@react-email/components";
import { type EmailRequestProps } from './NewServiceRequestEmail';

export type EmailServiceProps = EmailRequestProps & {
    price: number;
    address: string;
    city: string;
};

export default function FinishServiceEmail({
    link = 'https://solucionado.com.ar/solicitudes-de-servicio/',
    buttonText = 'Ver solicitud',
    userName = 'Francisco',
    categorieName = 'Electricidad',
    requestedByUsername = 'Santiago',
    price,
    address,
    city,
}: EmailServiceProps) {
    // const baseUrl = getBaseUrl();

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
            <Body className="bg-white my-auto mx-auto font-sans">
                <Container className="border border-solid border-[#eaeaea] max-w-lg rounded my-[40px] mx-auto p-[20px] w-[465px]">
                    <Section className="mt-[32px]">
                        <Img
                            src={`https://res.cloudinary.com/dozjn0kxw/image/upload/v1706170808/solucionado/solucionado-isologo.png`}
                            width="40"
                            height="40"
                            alt="Solucionado"
                            className="my-0 mx-auto"
                        />
                    </Section>
                    <Heading className="text-black text-[24px] font-normal text-center p-0 py-[30px] mx-0">

                        {' Nueva pago en tu servicio de '}  <strong>{categorieName}</strong>
                    </Heading>
                    <Text className="text-black text-[14px] leading-[24px]">
                        Hola {userName},
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        <strong>{requestedByUsername}</strong> ha liberado el pago para tu servicio de <strong>{categorieName}</strong> en{" "}
                        <strong>{address}</strong>{" ,"} <strong>{city}</strong>.
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        En breve recibirás el dinero en tu cuenta bancaria. Por un total de <strong>${price}</strong>.
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        Gracias por confiar en Solucionado para tus servicios.
                    </Text>
                    <Section className="text-center mt-[32px] mb-[32px] ">
                        <Button
                            href={link}
                            className="bg-blue-500 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3 "
                        >
                            {buttonText}
                        </Button>
                    </Section>
                    <Text className="text-black text-[14px] leading-[24px]">
                        o copia y pega esta direccion en tu navegador:{" "}
                        <Link href={link} className="text-blue-600 no-underline">
                            {link}
                        </Link>
                    </Text>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-black text-[14px] leading-[24px]">
                        Solucionado S.A - <Link href={'https://solucionado.com.ar'} className="text-blue-600 no-underline">
                            {'solucionado.com.ar'}
                        </Link>
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        Si quieres hablar con nosotros, puedes escribirnos a <Link href={'mailto:solucionadosa@gmail.com'} className="text-blue-600 no-underline">
                            {'soporte@solucionado.com.com'}
                        </Link>

                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        Si no quieres recibir mas notificaciones de esta categoria puedes desactivarlas en tu <Link href={'https://solucionado.com.ar/perfil'} className="text-blue-600 no-underline">
                            {'panel de control'}
                        </Link>

                    </Text>

                </Container>
            </Body>
        </Tailwind>
    );
}



