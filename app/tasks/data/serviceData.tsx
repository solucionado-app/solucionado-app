import { Status } from "@prisma/client"
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
]

export const normalizeStatus = (status: Status) => {
    switch (status) {
        case "PENDING":
            return "En proceso"
        case "ACEPTED":
            return "Aceptado"
        case "FINISHED":
            return "Finalizado"
        case "REJECTED":
            return "Rechazado"
        default:
            return "En proceso"
    }
}
type paymentStatus = 'ACREDITADO' | 'ENVIADO' | 'PENDIENTE' | 'RECHAZADO' | '' | null;



export const normalizePaymentStatus = (status: paymentStatus) => {
    switch (status) {
        case null:
            return "En espera"

    }
}

export const statuses = [

    {
        value: "En proceso",
        label: "En proceso",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "Aceptado",
        label: "Aceptado",
        icon: StopwatchIcon,
    },
    {
        value: "Finalizado",
        label: "Finalizado",
        icon: CheckCircledIcon,
    },
    {
        value: "Rechazado",
        label: "Rechazado",
        icon: CrossCircledIcon,
    },
]

export const paymentStatuses = [
    {
        value: "",
        label: "En espera",
        icon: CircleIcon,
    },
    {
        value: "PENDIENTE",
        label: "Pendiente",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "ENVIADO",
        label: "En Proceso",
        icon: StopwatchIcon,
    },
    {
        value: "ACREDITADO",
        label: "Acreditado",
        icon: CheckCircledIcon,
    },
    {
        value: "RECHAZADO",
        label: "Rechazado",
        icon: CrossCircledIcon,
    },
]
