
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
import { SendWhatsapp } from "@/src/server/whatsapp";

interface Props {
  serviceId: string;
  categoryName: string;
  price: number;
  budgetAuthorId: string;
  budgetAuthorFirstName: string;
  budgetAuthorLastName: string;
  budgetAuthorEmail: string;
}

export const ConfirmServiceFinishedDialog = ({ serviceId , price, categoryName, budgetAuthorFirstName, budgetAuthorId, budgetAuthorLastName, budgetAuthorEmail}: Props) => {

  const { mutate } = api.service.finish.useMutation()
  const utils = trpc.useUtils()
  const handleFinishService = () => {
    mutate({ serviceId: serviceId, categoryName: categoryName , price: price,
      budgetAuthorFirstName, budgetAuthorId, budgetAuthorLastName, budgetAuthorEmail

     }, {
      onSuccess: () => {
        void utils.service.findById.invalidate({ id: serviceId })
        SendWhatsapp({ body: 'Se acaba de marcar un servicio como completado, por favor entra al panel de administración para ver los detalles y enviar la transferencia al solucionador lo antes posible.', to: '+5492995074637' })
        .then(() => console.log('whatsapp sent'))
        .catch((e) => console.log('error sending whatsapp', e))

      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-solYellow hover:bg-solYellow/80">Finalizar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estás por finalizar el servicio.</AlertDialogTitle>
          <AlertDialogDescription>
            Una vez finalices el servicio, no podrás cambiar su estado en el
            futuro. Y se liberara el dinero al solucionador.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleFinishService} className="bg-solYellow hover:bg-solYellow/80">
            Finalizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
