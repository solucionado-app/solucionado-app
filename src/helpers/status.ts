import type { Status } from "@prisma/client";

export const formatStatusToSpanish = (status: Status) => {
  switch (status) {
    case "ACEPTED":
      return "ACEPTADO";
    case "FINISHED":
      return "FINALIZADO";
    case "PENDING":
      return "PENDIENTE";
    case "REJECTED":
      return "RECHAZADO";
    default:
      break;
  }
};
