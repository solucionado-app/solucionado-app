/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { api } from "~/utils/api";
import Spinner from "../ui/spinner";
import { useToast } from "../ui/use-toast";

type ConfirmServiceFinishedDialogProps = {
  serviceId: string;
  refetch: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ConfirmServiceFinishedDialog = ({
  serviceId,
  refetch,
  setOpen,
}: ConfirmServiceFinishedDialogProps) => {
  const { toast } = useToast();
  const { mutateAsync, isLoading } = api.service.updateStatus.useMutation();

  const onHandleClick = async () => {
    try {
      await mutateAsync({ serviceId });
      toast({
        title: "Servicio Finalizado.",
        description: "El servicio se finalizó correctamente",
        variant: "success",
      });
      refetch();
      setOpen(true);
    } catch (error) {
      toast({
        title: "No se pudo finalizar el servicio.",
        description: "Por favor, inténtelo de nuevo más tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-solBlue hover:bg-solBlue/80">
          Finalizar Servicio
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estás por finalizar el servicio.</AlertDialogTitle>
          <AlertDialogDescription>
            Una vez finalices el servicio, no podrás cambiar su estado en el
            futuro. Y se le realizará el pago al prestador del servicio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-solBlue hover:bg-solBlue/80"
            onClick={onHandleClick}
          >
            {isLoading ? (
              <Spinner className="h-10 w-10 bg-solYellow text-white" />
            ) : (
              "Finalizar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
