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
import { IconProps } from "@radix-ui/react-icons/dist/types"

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
export type paymentStatus = 'ACREDITADO' | 'ENVIADO' | 'PENDIENTE' | 'RECHAZADO' | '' | null;

export type paymentStatusNotNull = 'ACREDITADO' | 'ENVIADO' | 'PENDIENTE' | 'RECHAZADO';


export const normalizePaymentStatus = (status: paymentStatus) => {
    switch (status) {
        case null:
            return "En espera"
        default:
            return status
    }
}

export const statuses = [

    {
        value: "PENDING",
        label: "En proceso",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "ACEPTED",
        label: "Aceptado",
        icon: StopwatchIcon,
    },
    {
        value: "FINISHED",
        label: "Finalizado",
        icon: CheckCircledIcon,
    },
    {
        value: "REJECTED",
        label: "Rechazado",
        icon: CrossCircledIcon,
    },
]

export const paymentStatuses: { value: paymentStatus, label: string, icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> }[] = [

    {
        value: "PENDIENTE",
        label: "En espera",
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


