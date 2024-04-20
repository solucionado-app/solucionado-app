/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter, useSearchParams } from "next/navigation";
import {
  type GetStaticPropsContext,
  type GetStaticPaths,
  type InferGetStaticPropsType,
} from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type MyPage } from "~/components/types/types";


import { api } from "~/utils/api";


import dynamic from "next/dynamic";
import Spinner from "~/components/ui/spinner";
import StatusTranslate from "~/components/servicerequest/StatusTranslate";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CldImage } from "next-cloudinary";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "@/src/utils/trpc";
import { useToast } from "@/src/components/ui/use-toast";
import { confettiAni } from "@/src/components/auth/FormSolucionador/ConfettiStep";



const tabsDynamic = () =>
  dynamic(() => import(`~/components/servicerequest/ServiceRequestTabs`), {
    loading: () => <Spinner className="h-12 w-12 text-solBlue" />,
  });

const confetiDynamic = () =>
  dynamic(() => import(`@/src/components/auth/FormSolucionador/ConfettiAnimation`), {
  });

const CategoryPage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const router = useRouter();

  const handleGoToSolicitudes = () => {
    router.push("/solicitudes-de-servicio");
  };
  const searchParams = useSearchParams();
  const newserviceRequestId = searchParams?.get("newserviceRequestId");
  const request = api.serviceRequest.findById.useQuery({ id }, {
    staleTime: Infinity,
    enabled: Boolean(newserviceRequestId),
  });
  const { data: serviceRequest } = request;
  const DynamicTabs = tabsDynamic();



  const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;



  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(serviceRequest?.amount ?? ''));


  const { toast } = useToast();
  const notificationApi = api.notification
  const useCheckNotificationExists = notificationApi.findByServiceRequestId.useQuery({ serviceRequestId: newserviceRequestId as string }, {
    enabled: Boolean(newserviceRequestId),

    onSuccess(data) {
      console.log('entro al onsuccess', data)
    },
  })


  const notification = notificationApi.create.useMutation()
  const utils = trpc.useContext()
  const [notificationsSent, setNotificationsSent] = useState(false);

  const sendNotifications = useCallback(() => {
    console.log('entro')
    if (notificationsSent || !!useCheckNotificationExists.data) return;
    if (notificationsSent) return;
    if (!newserviceRequestId) return
    if (!request?.data) return
    if (newserviceRequestId !== request?.data.id) return

    console.log('entro al try catch')
    toast({
      key: 'notificationProcessStart',
      title: "Proceso de Notificacion iniciado.",
      description: `Se ha creado una nueva solicitud de servicio para ${request?.data?.category?.name ?? ''} en tu zona.`,
      duration: 100000,
    });

    setTimeout(() => {
      confettiAni().then(() => {
        // Do something after the confetti animation
      }).catch((err) => {
        console.log(err);
      });
    }, 500);

    setNotificationsSent(true);
    notification.mutate({
      categorySlug: request?.data.category.slug,
      title: "Nueva solicitud de servicio",
      categoryName: request?.data.category.name,
      content: `Se ha creado una nueva solicitud de servicio para ${request?.data.category.name} en tu zona.`,
      link: `/solicitudes-de-servicio/${request?.data.id}`,
      serviceRequestId: newserviceRequestId,
      cityId: request?.data.cityId as string,
    }, {
      onSuccess: () => {
        console.log('entro al onsuccess')
        void utils.notification.getAll.invalidate()
        void utils.notification.countUnRead.invalidate()
        toast({
          key: 'notificationProcessfinished',
          title: "Notificacion creada",
          description: `Muy pronto solucionadores en tu zona veran tu solicitud.`,
          duration: 100000,

        });
        setNotificationsSent(true);
      },
      onError: (error) => {
        setNotificationsSent(true);
        let message = 'Ha ocurrido un error al enviar las notificaciones.'
        if (error instanceof Error) {
          message = error.message
        }
        console.log('entro al onerror')
        console.log(error)
        toast({
          key: 'notificationProcessfinished',
          title: "Ha ocurrido un error.",
          variant: "destructive",
          description: message,
          duration: Infinity,
        });
      }

    });



  }, [newserviceRequestId, request?.data, toast, notification, utils.notification.getAll, utils.notification.countUnRead, notificationsSent, useCheckNotificationExists.data]);

  useEffect(() => {

    if (newserviceRequestId && !useCheckNotificationExists.data && !notificationsSent && request?.data) {
      console.log('entro al if')
      sendNotifications()
    }
  }, [newserviceRequestId, useCheckNotificationExists.data, notificationsSent, request?.data, sendNotifications, toast]);



  return (
    <>
      <div className="container relative flex flex-col items-center justify-center gap-8 px-4 pt-24 w-full ">
        <Button
          className=" self-start cursor-pointer bg-solBlue text-white px-4 py-2 rounded"
          onClick={handleGoToSolicitudes}
        >
          <ArrowLeftIcon className="inline-block w-6 h-6" /> Volver a solicitudes
        </Button>

        <div className="flex w-full flex-col  items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div className=" flex flex-col md:flex-row w-full  ">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            {!!serviceRequest?.portrait?.url && <div className=" relative md:w-40 w-full  ">
              <CldImage src={serviceRequest.portrait?.url} fill className="  object-cover aspect-square rounded-t-lg md:rounded-none md:rounded-l-lg" alt={serviceRequest.category.name} />
            </div>
            }

            <div className="flex flex-col md:flex-row gap-4 justify-between w-full p-4 leading-normal">
              <div>
                <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                  Información de Solicitud
                </h1>
                <StatusTranslate status={serviceRequest?.status} />

                <p className="text-lg font-bold tracking-tight">
                  {serviceRequest?.category.name}
                </p>
              </div>
              {!!serviceRequest?.amount && <span className="text-xl text-green-500 font-medium tracking-tight">
                {price}
              </span>}



            </div>
          </div>

        </div>
        <Accordion type="single" className="w-full  px-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 " collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="no-underline">Ver detalles</AccordionTrigger>
            <AccordionContent >
              <p className="text-md font-semibold py-4">Descripción
                {serviceRequest?.description && <div className="text-sm  text-gray-500">
                  {serviceRequest?.description}
                </div>}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="text-md font-medium tracking-tight">
                  <span>Direccion: {serviceRequest?.address} </span>
                </p>
                <p className="text-md font-normal tracking-tight">
                  <span className="font-medium">Horario :</span> {serviceRequest?.schedule}
                </p>
                {serviceRequest?.details &&
                  Object.keys(serviceRequest?.details).map((key: string, i) => (
                    <p key={i}>
                      <span className="font-medium"> {key.replace(rex, "$1$4 $2$3$5").replace(/^(.)/, (match) => match.toUpperCase()) + ': '}</span>
                      <span>
                        {" "}
                        {serviceRequest?.details &&
                          serviceRequest?.details[
                          key as keyof typeof serviceRequest.details
                          ]}
                      </span>
                    </p>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DynamicTabs id={id} />
      </div>
    </>
  );
};


CategoryPage.Layout = "Main";
CategoryPage.Title = "Solicitud de servicio";
CategoryPage.Description = "Solicitud de servicio";


export default CategoryPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context?.params?.id;

  if (id == null) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  const ssg = ssgHelper(undefined);
  await ssg.serviceRequest.findById.prefetch({ id });
  await ssg.comment.getNumberOfCommentsRequest.prefetch({
    serviceRequestId: id,
  });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
