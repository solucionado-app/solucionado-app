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
import { Separator } from "@/app/ui/separator";
import ServiceRequestList from "@/src/components/servicerequest/ServiceRequestList";
// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServiceRequestSolucionador: MyPage = () => {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
    if (!isLoaded && isSignedIn)
        return <Spinner className="h-12 w-12 text-solBlue" />;

    const apitrcp = api.serviceRequest;
    const {
        data: services,
        isLoading,
        isFetched,
        fetchNextPage
    } = apitrcp.getAll.useInfiniteQuery({
        limit: 10,
    },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    const handleFetchNextPage = async () => {
        await fetchNextPage();
    };
    const data = services?.pages[0]?.serviceRequestItems;
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
                        Solicitudes de Servicio en tu zona
                    </h1>


                    <ServiceRequestList />


                </div>
            </main>
        </>
    );
};

export default ServiceRequestSolucionador;
ServiceRequestSolucionador.Layout = "Main";
ServiceRequestSolucionador.Title = "Solicitudes de Servicio";
ServiceRequestSolucionador.Description = "Solicitudes de Servicio";
