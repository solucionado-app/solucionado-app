import { api } from "~/utils/api";

import { type MyPage } from "~/components/types/types";
import MainHead from "~/components/layouts/head/MainHead";
import { useUser } from "@clerk/nextjs";
import ServicesTable from "~/components/servicesComponents/ServicesTable";
import Spinner from "~/components/ui/spinner";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServiceRequest: MyPage = () => {
    const { isLoaded, isSignedIn } = useUser();
    if (!isLoaded && isSignedIn)
        return <Spinner className="h-12 w-12 text-solBlue" />;

    const {
        data: services,
        isLoading,
        isFetched,
    } = api.service.getSolucionadorServices.useQuery();
    // console.log(user);
    // const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;

    return (
        <>
            <MainHead title="Solucionado App" description="app solucionado" />
            <main className="flex min-h-screen w-full flex-col items-center ">
                <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-24 ">
                    <h1 className="text-5xl font-extrabold tracking-tight">Servicios como solucionador</h1>
                    {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
                    {!!services && <ServicesTable services={services} />}
                    {isFetched && !services && (
                        <div className="text-2xl">Aun no tienes servicios activos en Solucionado</div>
                    )}
                </div>
            </main>
        </>
    );
};

export default ServiceRequest;
ServiceRequest.Layout = "Main";
ServiceRequest.Title = "Servicios";
ServiceRequest.Description = "Servicio";
