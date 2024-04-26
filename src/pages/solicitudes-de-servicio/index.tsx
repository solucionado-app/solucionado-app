import { api } from "~/utils/api";

import { type MyPage } from "~/components/types/types";
import { useUser } from "@clerk/nextjs";
import Spinner from "~/components/ui/spinner";
import { Card } from "~/components/ui/card";
import { format } from "date-fns";

import es from "date-fns/locale/es";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServiceRequest: MyPage = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded && isSignedIn)
    return <Spinner className="h-12 w-12 text-solBlue" />;

  const apitrcp = api.serviceRequest;
  const {
    data: services,
    isLoading,
    isFetched,
  } = apitrcp.getUserRequest.useQuery();
  // console.log(user);
  const priceFormat = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(price));
  }
  return (
    <>
      <main className="flex min-h-screen w-full flex-col  items-center ">
        <div className="flex w-full max-w-screen-xl flex-col items-center justify-center gap-2 px-4 py-24 ">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Solicitudes de Servicio
          </h1>
          <div className="w-full md:px-28 py-4 flex flex-col  gap-3">
            {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
            {services && services?.map((service) => (

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
                        {service.address && <div className="text-sm  text-gray-500">
                          <p className="text-md font-medium tracking-tight">
                            <span>Direccion: {service?.address} </span>
                          </p>
                        </div>}
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
                        <Button onClick={() => router.push(`/solicitudes-de-servicio/${service.id}`)} className="bg-solBlue text-white font-semibold w-full hover:bg-solYellow hover:text-gray-900">Ver presupuestos</Button>
                        <Button onClick={() => router.push(`/solicitudes-de-servicio/${service.id}?tab=comments`)} className="bg-solBlue/10 text-sol_lightBlue font-semibold w-full hover:bg-solYellow hover:text-gray-900">Ver comentarios</Button>
                      </div>

                    </div>






                  </div>
                  <div className="w-full flex flex-col gap-2 md:hidden">
                    <Button onClick={() => router.push(`/solicitudes-de-servicio/${service.id}`)} className="bg-solBlue text-white font-semibold w-full hover:bg-solYellow hover:text-gray-900">Ver presupuestos</Button>
                    <Button onClick={() => router.push(`/solicitudes-de-servicio/${service.id}?tab=comments`)} className="bg-solBlue/10 text-sol_lightBlue font-semibold w-full hover:bg-solYellow hover:text-gray-900">Ver comentarios</Button>
                  </div>
                </Card>
              </div>
            ))
            }
            {/* {services && <ServiceRequestTable serviceRequests={services} />} */}
            {isFetched && !services && (
              <div className="text-2xl">Aun no has hecho ninguna solicitud de servicio</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ServiceRequest;
ServiceRequest.Layout = "Main";
