import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";
import MainHead from "~/components/layouts/head/MainHead";
import { useUser } from "@clerk/nextjs";
import ServiceRequestTable from "~/components/servicerequest/ServiceRequestTable";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServiceRequest: MyPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded && isSignedIn)
    return (
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
    );

  const apitrcp = api.serviceRequest;
  const {
    data: services,
    isLoading,
    isFetched,
  } = apitrcp.getUserRequest.useQuery();
  // console.log(user);
  // const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;

  return (
    <>
      <MainHead title="Solucionado App" description="app solucionado" />

      <main className="flex min-h-screen w-full flex-col  items-center">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Solicitudes de Servicio
          </h1>
          {isLoading && (
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
          )}
          {/* {services && services?.map((service) => (

                        <div key={service.id} className="w-full">
                            <Link href={`/solicitudes-de-servicio/${service.id}`}>
                                <Card className="relative flex-col p-5 hover:bg-slate-200 ">
                                    <div className="font-bold">
                                        {service.category.name}
                                    </div>
                                    {service.address && <div className="text-sm text-gray-500">
                                        {service.address}
                                    </div>}
                                    {service?.date && <div className="text-sm text-gray-500">
                                        {format(service?.date, "PPP", { locale: es })}
                                    </div>}
                                    {service?.description && <div className="text-sm text-gray-500">
                                        {service?.description}
                                    </div>}
                                    {service.amount && <div className="text-sm text-gray-500">
                                        {service.amount}
                                    </div>}
                                    {
                                        service?.details && Object.keys(service?.details).map((key: string, i) => (

                                            <p key={i}>
                                                <span> {key.replace(rex, '$1$4 $2$3$5')}</span>
                                                <span> {service?.details && service?.details[key as keyof typeof service.details]}</span>
                                            </p>
                                        ))
                                    }


                                </Card>
                            </Link>
                        </div>
                    ))
                    } */}
          {services && <ServiceRequestTable serviceRequests={services} />}
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
