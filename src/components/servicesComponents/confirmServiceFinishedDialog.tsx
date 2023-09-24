
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
import { trpc } from "~/utils/trpc";

interface Props {
  serviceId: string;
}

export const ConfirmServiceFinishedDialog = ({ serviceId }: Props) => {

  const { mutate } = api.service.finish.useMutation()
  const utils = trpc.useContext()
  const handleFinishService = () => {
    mutate({ serviceId: serviceId }, {
      onSuccess: () => {
        void utils.service.findById.invalidate({ id: serviceId })
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
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
          <AlertDialogAction onClick={handleFinishService} className="bg-solBlue hover:bg-solBlue/80">
            Finalizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
