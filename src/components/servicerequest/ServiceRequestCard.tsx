import { format } from "date-fns";
import es from "date-fns/locale/es";
import { useRouter } from "next/router";
import { CldImage } from "next-cloudinary";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "@/app/ui/separator";

interface ServiceRequestCardProps {
    service: {
        id: string;
        portrait: {
            url: string;
        } | null;
        status: string;
        amount: string | null;
        date: Date | null;
        category: {
            name: string;
        };
        address: string | null;
        City: {
            name: string;
        }| null;
        Province: {
            name: string;
        }| null;
        description: string | null;
        schedule: string | null;
        urgency: string | null;
    };
}

const ServiceRequestCard = ({ service }: ServiceRequestCardProps) => {
    const router = useRouter();
    const priceFormat = (price: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(parseFloat(price));
    }
    return (
        <div key={service.id} className="w-full">
            <Card className="flex flex-col gap-3 hover:bg-slate-200 p-3 ">
                <div className="flex flex-col md:flex-row  gap-1 h-full md:gap-10" >

                    {/* Agregar la imagen en la parte izquierda y hacer que ocupe todo el alto de la tarjeta */}
                    {!!service.portrait?.url && <div className="w-full h-48 md:h-56 md:w-4/12 relative  ">
                        <CldImage src={service.portrait?.url} fill alt={service.category.name} className="object-cover w-16 md:w-full aspect-square rounded-md " />

                    </div>
                    }
                    {/* Mover el resto de los elementos a la derecha de la tarjeta */}
                    <div className=" flex flex-col md:flex-row gap-4 w-full justify-between">
                        <div className="md:w-7/10">
                            {service?.status === 'PENDING' && <div className="text-md text-solYellow font-semibold">
                                {'Pendiente'}
                            </div>}
                            {service?.status === 'ACEPTED' && <div className="text-md text-green-500 font-semibold">
                                {'Finalizada'}
                            </div>}
                            {!!service?.amount && <div className="text-sm text-lime-500">
                                {priceFormat(service?.amount)}
                            </div>}
                            {/* Mover la fecha al inicio del componente */}
                            {service?.date && <div className="text-sm text-gray-500 whitespace-break-spaces">
                                {format(service?.date, "PPP", { locale: es })}
                            </div>}
                            <div className="font-bold">
                                {service.category.name}
                            </div>
                            {service.address && <p className="text-md font-semibold tracking-tight">
                                <span>Direccion: {service?.address} </span>
                            </p>
                            }
                            <p className="text-md font-semibold tracking-tight">
                                <span>{service?.City?.name ?? ''}, {service.Province?.name ?? ''} </span>
                            </p>

                            <Separator className="my-2" />
                            <div className=" md:flex flex-col hidden  gap-2 ">
                                <p className="text-md font-semibold">Descripción</p>
                                {service?.description && <div className="text-sm  text-gray-500">
                                    {service?.description}
                                </div>}

                                {service.schedule && <div className="text-sm text-gray-500">
                                    <span className="font-semibold">Horario: </span> {service.schedule}
                                </div>}
                                {service.urgency && <div className="text-sm text-gray-500">
                                    {'Urgente: ' + service.urgency}
                                </div>}


                            </div>
                        </div>


                        <div className="justify-self-end	flex-col md:flex gap-3 hidden ">
                            <Button onClick={() =>void router.push(`/solicitudes-de-servicio/${service.id}`)} className="bg-solYellow text-gray-900 font-semibold w-full hover:bg-solBlue hover:text-gray-50">Generar presupuesto</Button>
                            <Button onClick={() =>void router.push(`/solicitudes-de-servicio/${service.id}?tab=comments`)} className="bg-solBlue/10 text-sol_lightBlue font-semibold w-full hover:bg-solYellow hover:text-gray-900">Ver comentarios</Button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2 md:hidden">
                    <Button onClick={() => void router.push(`/solicitudes-de-servicio/${service.id}`)} className="bg-solYellow text-gray-900 font-semibold w-full hover:bg-solBlue hover:text-gray-50">Generar presupuesto</Button>
                    <Button onClick={() =>void router.push(`/solicitudes-de-servicio/${service.id}?tab=comments`)} className="bg-solBlue/10 text-sol_lightBlue font-semibold w-full hover:bg-solYellow hover:text-gray-900">Ver comentarios</Button>
                </div>
            </Card>
        </div>
    );
};

export default ServiceRequestCard;