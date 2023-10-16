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
import { useUser } from "@clerk/nextjs";


import dynamic from "next/dynamic";
import Spinner from "~/components/ui/spinner";


const budgetTableDynamic = () =>
  dynamic(() => import(`~/components/budgets/BudgetsTable`), {
    loading: () => <Spinner className="h-12 w-12 text-solBlue" />,
  });

const tabsDynamic = () =>
  dynamic(() => import(`~/components/servicerequest/ServiceRequestTabs`), {
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
  const DynamicTabs = tabsDynamic();
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
