import { api } from "~/utils/api";

import { type MyPage } from "~/components/types/types";
import { useUser } from "@clerk/nextjs";
import ServiceRequestTable from "~/components/servicerequest/ServiceRequestTable";
import Spinner from "~/components/ui/spinner";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import { format } from "date-fns";

import es from "date-fns/locale/es";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServiceRequest: MyPage = () => {
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
  const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;

  return (
    <>
      <main className="flex min-h-screen w-full flex-col  items-center ">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-24 ">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Solicitudes de Servicio
          </h1>
          {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
          {services && services?.map((service) => (

            <div key={service.id} className="w-full">
              <Link href={`/solicitudes-de-servicio/${service.id}`}>
                <Card className="relative flex flex-row p-4 gap-4 hover:bg-slate-200 ">
                  {/* Agregar la imagen en la parte izquierda y hacer que ocupe todo el alto de la tarjeta */}
                  <div className="w-2/5">
                    <img src={'https://flowbite.com/docs/images/blog/image-1.jpg'} alt={service.category.name} className="object-cover h-full" />
                  </div>
                  {/* Mover el resto de los elementos a la derecha de la tarjeta */}
                  <div className="w-3/5">
                    {/* Mover la fecha al inicio del componente */}
                    {service?.date && <div className="text-sm text-gray-500">
                      {format(service?.date, "PPP", { locale: es })}
                    </div>}
                    <div className="font-bold">
                      {service.category.name}
                    </div>
                    {service.address && <div className="text-sm text-gray-500">
                      {service.address}
                    </div>}
                    {service?.description && <div className="text-sm text-gray-500">
                      {service?.description}
                    </div>}
                    {service.amount && <div className="text-sm text-gray-500">
                      {service.amount}
                    </div>}
                    {service.schedule && <div className="text-sm hidden md:block text-gray-500">
                      <span className="font-semibold">Horario: </span> {service.schedule}
                    </div>}
                    {service.urgency && <div className="text-sm hidden md:block text-gray-500">
                      {'Urgente: ' + service.urgency}
                    </div>}

                    {service?.status === 'PENDING' && <div className="text-md text-solYellow font-semibold">
                      {'Pendiente'}
                    </div>}
                    {service?.status === 'ACEPTED' && <div className="text-md text-green-500 font-semibold">
                      {'Aceptado'}
                    </div>}
                    {/* {
                      service?.details && Object.keys(service?.details).map((key: string, i) => (
                        <p key={i}>
                          <span> {key.replace(rex, '$1$4 $2$3$5')}</span>
                          <span> {service?.details && service?.details[key as keyof typeof service.details]}</span>
                        </p>
                      ))
                    } */}
                  </div>
                </Card>
              </Link>
            </div>
          ))
          }
          {/* {services && <ServiceRequestTable serviceRequests={services} />} */}
          {isFetched && !services && (
            <div className="text-2xl">No hay servicios</div>
          )}
        </div>
      </main>
    </>
  );
};

export default ServiceRequest;
ServiceRequest.Layout = "Main";
