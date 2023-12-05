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

export const statuses = [
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


