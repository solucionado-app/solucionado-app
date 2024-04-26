/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  type GetStaticPropsContext,
  type GetStaticPaths,
  type InferGetStaticPropsType,
} from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type MyPage } from "~/components/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { api } from "~/utils/api";
import ServiceComents from "~/components/servicesComponents/ServiceComents";

import CommentServiceForm from "~/components/servicesComponents/CommentServiceForm";
import { Badge } from "~/components/ui/badge";
import { AvatarSolucionador } from "~/components/ui/avatarSolucionador";
import { ConfirmServiceFinishedDialog } from "~/components/servicesComponents/confirmServiceFinishedDialog";
import { useUser } from "@clerk/nextjs";
import ReviewComponent from "~/components/reviews/ReviewComponent";

const ServicePage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const request = api.service.findById.useQuery({ id });
  const { data: service } = request;
  const { user } = useUser()
  if (!service) {
    return <div></div>;
  }

  return (
    <>
      <div className="flex w-full  max-w-7xl flex-col items-center justify-center gap-8 px-4 py-24">
        <div className="w-full max-w-7xl">
          {" "}
          <div className="w-full space-y-2 py-5 text-xl font-semibold shadow-sm">
            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
                Información del Servicio
              </h1>
              {/* <Button variant="destructive">Finalizar</Button> */}
              {user && service && user?.id !== service?.budget.author.id && service.status !== "FINISHED" && < ConfirmServiceFinishedDialog
              serviceId={service.id}
              categoryName={service.category.name}
              price={service.budget.price}
              budgetAuthorId={service.budget.author.id}
              budgetAuthorFirstName={service.budget.author.first_name as string}
              budgetAuthorLastName={service.budget.author.last_name as string}
              budgetAuthorEmail={service.budget.author.email}
              />}
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Badge
                  className="bg-sol_lightBlue text-white"
                  variant="secondary"
                >
                  {service?.category.name}
                </Badge>
              </div>
              <div>
                <Badge
                  className="bg-sol_lightBlue text-white"
                  variant="secondary"
                >
                  {service?.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {service?.description}
              </div>
            </div>
          </div>
          <Tabs defaultValue={service?.status === "FINISHED" ? "review" : "comments"} className="w-full ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Mensajes</TabsTrigger>
              {user && service?.status === "FINISHED" && <TabsTrigger value="review">Reseña </TabsTrigger>}
            </TabsList>
            {user && service && service?.status === "FINISHED" && <TabsContent value="review">
              <Card>
                <CardHeader>
                  <CardTitle>Reseña</CardTitle>
                  <CardDescription>Porfavor deja una reseña sobre el servicio del solucionador</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 py-2">
                  <ReviewComponent serviceId={service.id} budgetAuthorId={service.budget.author.id} />
                </CardContent>
              </Card>
            </TabsContent>
            }
            <TabsContent value="comments">
              <Card className="bg-slate-100">
                <CardHeader className="rounded-t-lg bg-white">
                  <CardTitle className="flex items-center gap-2">
                    <AvatarSolucionador
                      userId={service.budget.author.id}
                      image={service.budget.author.image_url as string ?? ""}
                    />
                    Mensajes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-0">
                  <div className="space-y-4">
                    <ServiceComents serviceId={id} />
                  </div>
                </CardContent>
                <CardFooter className="rounded-b-lg border-t-gray-300 bg-white py-4">
                  {service && service.status !== "FINISHED" && <CommentServiceForm
                    service={service}
                    serviceId={id}
                    categoryName={service?.category.name}
                  />}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
ServicePage.Layout = "Main";
ServicePage.Title = "Servicio";
ServicePage.Description = "Servicio";

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
  await ssg.service.findById.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
