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
import { Separator } from '@/app/ui/separator'

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

    const { data: budgets } =
        api.budget.getAll.useQuery({ serviceRequestId: id }, {
            staleTime: Infinity,
        });

    const { data: budgetListSolucionador } = api.budget.findByRequestId.useQuery(
        { serviceRequestId: id },
        {
            enabled: Boolean(!!user && user?.id !== serviceRequest?.userId),
        }
    );

    const searchParams = useSearchParams();
    const tab = searchParams?.get("tab");
    if(!serviceRequest || !isLoaded || !user || !budgets || !budgetListSolucionador) {
        return <Spinner className="h-28 w-28 text-solBlue" />;
    }
    return (
        <>
            {!serviceRequest && !isLoaded && !user && <Spinner className="h-12 w-12 text-solBlue" />}
            {!!user && isSignedIn && !!serviceRequest && <Tabs defaultValue={tab ?? 'budget'} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="budget"  >Presupuestos</TabsTrigger>
                    <TabsTrigger value="comments" >Comentarios</TabsTrigger>
                </TabsList>
                <TabsContent value="budget">
                    { user?.id === serviceRequest?.userId ? <Card>
                        <CardHeader>
                            <CardTitle>Presupuestos</CardTitle>
                            <CardDescription>Estos son los presupuestos que se han enviado a tu solicitud</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 p-2">
                            <div className="space-y-1">
                                {user?.id === serviceRequest?.userId &&

                                    !!budgets &&  <DynamicBudgetTable budgets={budgets} status={serviceRequest?.status} />}
                                {/* <Budgets /> */}
                                {!!budgetListSolucionador && budgetListSolucionador.length > 0 && user?.id !== serviceRequest?.userId && !!serviceRequest && (
                                    <><DynamicBudgetTable budgets={budgetListSolucionador} status={serviceRequest?.status} isSolucionador={true} /></>
                                )}

                            </div>
                        </CardContent>
                        <CardFooter>{/* <Button>ver mas</Button> */}</CardFooter>
                    </Card> :  serviceRequest?.status !== 'ACEPTED' ?
                            (user?.id !== serviceRequest?.userId &&<>
                                <Card>
                                    <CardHeader>
                                        <BudgetsForm
                                            serviceRequest={serviceRequest}
                                            serviceRequestId={id}
                                        />
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="space-y-2 pt-6 ">
                                        <div className="space-y-1">

                                                <CardTitle>Presupuestos</CardTitle>
                                                <CardDescription>Estos son los presupuestos que se has enviado a esta solicitud</CardDescription>

                                            {(
                                                <DynamicBudgetTable budgets={budgetListSolucionador} status={serviceRequest?.status} isSolucionador={true} />
                                            )}
                                        </div>
                                    </CardContent>
                                    </Card>
                            </>)
                            : <Card>
                        <CardHeader>
                            <CardTitle>Presupuestos</CardTitle>
                            <CardDescription>El usuario que hizo la solicitud ya ha aceptado un presupuesto.</CardDescription>
                        </CardHeader>
                    </Card>}
                </TabsContent>
                <TabsContent value="comments">
                    <Card>
                        <CardHeader>
                            {serviceRequest?.status !== 'ACEPTED' && <CommentsForm
                                serviceRequest={serviceRequest}
                                serviceRequestId={id}
                                categoryName={serviceRequest?.category.name}
                            />}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <CardTitle>Comentarios</CardTitle>
                            <CommentsServiceRequest serviceRequestId={id} />



                        </CardContent>
                        <CardFooter>
                            {/* <Button>Ver Más</Button> */}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>}
        </>
    )
}
