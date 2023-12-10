import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import CommentsServiceRequest from '../comments/CommentsServiceRequest'
import BudgetsForm from '../budgets/BudgetsForm'
import { useSearchParams } from 'next/navigation'
import { api } from '~/utils/api'
import dynamic from 'next/dynamic'
import { useUser } from '@clerk/nextjs'
import Spinner from '../ui/spinner'
import CommentsForm from '../comments/CommentForm'
import { Button } from '../ui/button'

const budgetTableDynamic = () =>
    dynamic(() => import(`~/components/budgets/BudgetsTable`), {
        loading: () => <Spinner className="h-12 w-12 text-solBlue" />,
    });

interface Props {
    id: string
}

export default function ServiceRequestTabs({ id }: Props) {
    const { user, isLoaded, isSignedIn } = useUser();
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
            enabled: Boolean(!!user && user?.id !== serviceRequest?.userId),
        }
    );

    console.log(budgets)
    console.log(!!user && !!serviceRequest && user?.id === serviceRequest?.userId, user?.id, serviceRequest?.userId)

    const searchParams = useSearchParams();
    const tab = searchParams?.get("tab");
    return (
        <>
            {!isLoaded && <Spinner className="h-12 w-12 text-solBlue" />}
            {!!user && isSignedIn && <Tabs defaultValue={tab ?? 'budget'} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="budget"  >Presupuestos</TabsTrigger>
                    <TabsTrigger value="comments" >Comentarios</TabsTrigger>
                </TabsList>
                <TabsContent value="budget">
                    {!!user && !!serviceRequest && user?.id === serviceRequest?.userId ? <Card>
                        <CardHeader>
                            <CardTitle>Presupuestos</CardTitle>
                            <CardDescription>Estos son los presupuestos que se han enviado a tu solicitud</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 p-2">
                            <div className="space-y-1">
                                {user?.id === serviceRequest?.userId &&
                                    !budgetsIsLoading &&
                                    !!budgets && !!serviceRequest ? <DynamicBudgetTable budgets={budgets} status={serviceRequest?.status} /> : null}
                                {/* <Budgets /> */}
                                {!!budgetListSolucionador && !!serviceRequest && (
                                    <DynamicBudgetTable budgets={budgetListSolucionador} status={serviceRequest?.status} isSolucionador={true} />
                                )}
                                {user?.id !== serviceRequest?.userId && serviceRequest?.status !== 'ACEPTED' ?
                                    <BudgetsForm
                                        serviceRequest={serviceRequest}
                                        serviceRequestId={id}
                                    />
                                    : null}


                            </div>
                        </CardContent>
                        <CardFooter>{/* <Button>ver mas</Button> */}</CardFooter>
                    </Card> : <Card>
                        <CardHeader>
                            <CardTitle>Presupuestos</CardTitle>
                            <CardDescription>El usuario que hizo la solicitud ya ha aceptado un presupuesto.</CardDescription>
                        </CardHeader>
                    </Card>}
                </TabsContent>
                <TabsContent value="comments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Comentarios</CardTitle>
                            <CardDescription>Estos van los comentarios de tu solicitud</CardDescription>
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
            </Tabs>}
        </>
    )
}
