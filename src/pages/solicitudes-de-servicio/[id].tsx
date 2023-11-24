/* eslint-disable @typescript-eslint/no-misused-promises */
import { type SignedInAuthObject } from "@clerk/nextjs/server";
import {
  type GetStaticPropsContext,
  type GetStaticPaths,
  type InferGetStaticPropsType,
} from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type JwtPayload, type ServerGetTokenOptions } from "@clerk/types";
import { type MyPage } from "~/components/types/types";


import { api } from "~/utils/api";


import dynamic from "next/dynamic";
import Spinner from "~/components/ui/spinner";
import StatusTranslate from "~/components/servicerequest/StatusTranslate";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";



const tabsDynamic = () =>
  dynamic(() => import(`~/components/servicerequest/ServiceRequestTabs`), {
    loading: () => <Spinner className="h-12 w-12 text-solBlue" />,
  });

const CategoryPage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const request = api.serviceRequest.findById.useQuery({ id }, {
    staleTime: Infinity,
  });
  const { data: serviceRequest } = request;
  const DynamicTabs = tabsDynamic();



  const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;



  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(serviceRequest?.amount ?? ''));
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-8 px-4 pt-24 w-full ">

        <div className="flex w-full flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div className=" flex flex-col md:flex-row w-full  ">
            <img className="object-cover w-full rounded-tl-lg h-96 md:h-auto md:w-1/4 md:rounded-none md:rounded-tl-lg " src="https://flowbite.com/docs/images/blog/image-4.jpg" alt="" />
            <div className="flex flex-col  p-4 leading-normal">
              <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                Información de Solicitud
              </h1>
              <StatusTranslate status={serviceRequest?.status} />

              <p className="text-lg font-bold tracking-tight">
                {serviceRequest?.category.name}
              </p>
              <p className="text-md font-semibold pt-4">Precio tentativo</p>
              <span className="text-xl text-green-500 font-medium tracking-tight">
                {price}
              </span>
              <p className="text-md font-semibold pt-4">Descripción</p>
              {serviceRequest?.description && <div className="text-sm  text-gray-500">
                {serviceRequest?.description}
              </div>}

              <p className="text-md font-medium tracking-tight pt-4">
                <span>Direccion: {serviceRequest?.address} </span>
              </p>
              <p className="text-md font-normal tracking-tight">
                <span className="font-medium">Horario :</span> {serviceRequest?.schedule}
              </p>

            </div>
          </div>

        </div>
        <Accordion type="single" className="w-full  px-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 " collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="no-underline">Ver detalles</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* <div className="relative border p-5  text-xl font-semibold  w-full shadow-sm">
          <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
            Información de Solicitud
          </h1>
          <p className="text-lg font-bold tracking-tight">
            {serviceRequest?.category.name}
          </p>
          <p className="text-md font-medium tracking-tight">
            {serviceRequest?.address}
          </p>
          <p className="text-md font-medium tracking-tight">
            {serviceRequest?.description}
          </p>
          <p className="text-xl text-green-500 font-medium tracking-tight">
            {price}
          </p>
          <p className="text-md font-medium tracking-tight">
            {serviceRequest?.schedule}
          </p>

          <StatusTranslate status={serviceRequest?.status} />
          {serviceRequest?.details &&
            Object.keys(serviceRequest?.details).map((key: string, i) => (
              <p key={i}>
                <span> {key.replace(rex, "$1$4 $2$3$5")}</span>
                <span>
                  {" "}
                  {serviceRequest?.details &&
                    serviceRequest?.details[
                    key as keyof typeof serviceRequest.details
                    ]}
                </span>
              </p>
            ))}
        </div> */}

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
  const auth: SignedInAuthObject = {
    sessionId: "123",
    session: undefined,
    actor: undefined,
    userId: "123",
    user: undefined,
    orgId: undefined,
    orgRole: undefined,
    orgSlug: undefined,
    sessionClaims: {} as JwtPayload,
    organization: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getToken: function (
      _options?: ServerGetTokenOptions | undefined
    ): Promise<string | null> {
      throw new Error("Function not implemented.");
    },
    debug: function (): unknown {
      throw new Error("Function not implemented.");
    },
  };
  const ssg = ssgHelper(auth);
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
