import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "../ui/button";
export const ConfirmServiceFinishedDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-solBlue hover:bg-solBlue/80">Finalizar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estás por finalizar el servicio.</AlertDialogTitle>
          <AlertDialogDescription>
            Una vez finalices el servicio, no podrás cambiar su estado en el
            futuro. Y se le pagará al prestador del servicio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-solBlue hover:bg-solBlue/80">
            Finalizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
