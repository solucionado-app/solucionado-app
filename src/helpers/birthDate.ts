import { differenceInYears } from "date-fns";
export function calculateAge(birthDate: Date): number {
  const actualDate = new Date();
  const age = differenceInYears(actualDate, birthDate);
  return age;
}
