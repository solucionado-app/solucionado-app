import { useRouter } from "next/router";
import { api } from "~/utils/api";

export const useAcceptBudget = () => {
    const router = useRouter();
    const mutationAcceptBudget = api.budget.accept.useMutation()
    const nofitificationMutation = api.notification.createBudgetAcceptedNotification.useMutation()
    const createService = api.service.create.useMutation()
    const acceptBudget = (budgetId: string, serviceRequestId: string) => {


        mutationAcceptBudget.mutate({
            budgetId,
            serviceRequestId
        }, {
            onSuccess: (data) => {
                console.log("Budget accepted")
                createService.mutate({
                    title: "Service",
                    description: data.description,
                    categoryId: 1,
                    budgetId: budgetId
                },{
                    onSuccess: (data) => {
                       void router.push("/servicios/" + data.id)
                    }
                })
                nofitificationMutation.mutate({
                    userId: data.author.id,
                    title: "Budget accepted",
                    content: "Your budget has been accepted",
                    budgetId: budgetId,
                    serviceRequestId: serviceRequestId,
                    authorLastName: data.author?.last_name as string || "",
                    authorName: data.author?.first_name as string || "",
                    link: "/solicitudes-de-servicio/" + serviceRequestId
                })
            }
        })
    }

    return acceptBudget;
};