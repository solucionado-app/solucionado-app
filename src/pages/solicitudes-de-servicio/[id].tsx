/* eslint-disable @typescript-eslint/no-misused-promises */
import { type SignedInAuthObject } from "@clerk/nextjs/server";
import {
  type GetStaticPropsContext,
  type GetStaticPaths,
  type InferGetStaticPropsType,
} from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type JwtPayload, type ServerGetTokenOptions } from "@clerk/types";
import Head from "next/head";
import { type MyPage } from "~/components/types/types";
import { Button } from "~/components/ui/button";
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
import { useUser } from "@clerk/nextjs";
import BudgetsForm from "~/components/budgets/BudgetsForm";
import CommentsForm from "~/components/comments/CommentForm";
import CommentsServiceRequest from "~/components/comments/CommentsServiceRequest";

import dynamic from "next/dynamic";
import Spinner from "~/components/ui/spinner";

const budgetTableDynamic = () =>
  dynamic(() => import(`~/components/budgets/BudgetsTable`), {
    loading: () => <Spinner className="h-12 w-12 text-solBlue" />,
  });

const CategoryPage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { user } = useUser();
  const request = api.serviceRequest.findById.useQuery({ id }, {
    staleTime: Infinity,
  });
  const { data: serviceRequest } = request;

  const DynamicBudgetTable = budgetTableDynamic();

  const { data: budgets, isLoading: budgetsIsLoading } =
    api.budget.getAll.useQuery({ serviceRequestId: id }, {
      staleTime: Infinity,
    });

  const { data: budgetListSolucionador } = api.budget.findByRequestId.useQuery(
    { serviceRequestId: id },
    {
      enabled: Boolean(user && user?.id !== serviceRequest?.userId),
    }
  );
  const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <div className="relative border p-5  text-xl font-semibold  shadow-sm">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Información de Solicitud
          </h1>
          <p className="text-2xl font-bold tracking-tight">
            {serviceRequest?.category.name}
          </p>
          <p className="text-2xl font-bold tracking-tight">
            {serviceRequest?.status}
          </p>
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
        </div>
        <Tabs defaultValue="account" className="w-full p-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Presupuestos</TabsTrigger>
            <TabsTrigger value="password">Comentarios</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Presupuestos</CardTitle>
                <CardDescription>aca van los presupuestos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  {/* <Budgets /> */}
                  {budgetListSolucionador && serviceRequest && (
                    <DynamicBudgetTable budgets={budgetListSolucionador} status={serviceRequest?.status} isSolucionador={true} />
                  )}
                  {user?.id !== serviceRequest?.userId && serviceRequest?.status !== 'ACEPTED' && (
                    <BudgetsForm
                      serviceRequest={serviceRequest}
                      serviceRequestId={id}
                    />
                  )}

                  {user?.id === serviceRequest?.userId &&
                    !budgetsIsLoading &&
                    budgets && serviceRequest && <DynamicBudgetTable budgets={budgets} status={serviceRequest?.status} />}
                </div>
              </CardContent>
              <CardFooter>{/* <Button>ver mas</Button> */}</CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Comentarios</CardTitle>
                <CardDescription>aca van los comentarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  {serviceRequest?.status !== 'ACEPTED' && <CommentsForm
                    serviceRequest={serviceRequest}
                    serviceRequestId={id}
                    categoryName={serviceRequest?.category.name}
                  />}
                  <CommentsServiceRequest serviceRequestId={id} />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Ver Más</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
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
