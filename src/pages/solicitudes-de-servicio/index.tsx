import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/cards/CardComponent";
import Image from "next/image";
import MainHead from "~/components/layouts/head/MainHead";
import Link from "next/link";
import { slugify } from "~/utils/utils";
import { useUser } from "@clerk/nextjs";
import { object } from "zod";



// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServiceRequest: MyPage = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    if (!isLoaded && isSignedIn) return <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>

    const userId = user?.id || "";
    const apitrcp = api.serviceRequest;
    const { data: services, isLoading, isFetched } = apitrcp.getAll.useQuery({ userId: userId });
    console.log(services);
    const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;

    return (
        <>
            <MainHead title="Solucionado App" description="app solucionado" />

            <main className="flex min-h-screen flex-col items-center  ">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight  sm:text-[5rem]">
                        <span className="text-[hsl(280,100%,70%)]">Solucionado</span> App
                    </h1>
                    {isLoading && <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>}
                    {services && services?.map((service) => (
                        <div key={service.id}>
                            <Card className="relative w-[320px]  flex-col p-5  ">
                                <div >
                                    {service.category.name}
                                </div>
                                {
                                    Object.keys(service?.details).map((key, i) => (
                                        <p key={i}>
                                            <span> {key.replace(rex, '$1$4 $2$3$5')}</span>
                                            <span> {service?.details[key]}</span>
                                        </p>
                                    ))
                                }


                            </Card>
                        </div>
                    ))
                    }
                    {
                        isFetched && !services && <div className="text-2xl">No hay servicios</div>
                    }
                </div>
            </main>
        </>
    );
}

export default ServiceRequest;
ServiceRequest.Layout = "Main";

