import { differenceInYears } from "date-fns";

export function calculateAge(birthDate: Date): number {
  const actualDate = new Date();
  const age = differenceInYears(actualDate, birthDate);
  return age;
}

export function getDateAsTwitterFormat(fecha: Date) {
  const now = new Date();
  const restInMilisecond = (now.getTime() - fecha.getTime()) / 1000;

  if (restInMilisecond < 60) {
    return `${Math.floor(restInMilisecond)} segundo(s) atrás`;
  } else if (restInMilisecond < 3600) {
    return `${Math.floor(restInMilisecond / 60)} minuto(s) atrás`;
  } else if (restInMilisecond < 86400) {
    return `${Math.floor(restInMilisecond / 3600)} hora(s) atrás`;
  } else if (restInMilisecond < 604800) {
    return `${Math.floor(restInMilisecond / 86400)} día(s) atrás`;
  } else {
    // Si han pasado más de 1 semana, mostrar el formato DD/MM/YYYY
    const day = fecha.getDate().toString().padStart(2, "0");
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const year = fecha.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
}
