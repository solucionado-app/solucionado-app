import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
// import { ReviewServiceForm } from "../reviews/ReviewServiceForm";
import { Button } from "../ui/button";

type ServiceReviewModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ServiceReviewModal = ({
  open,
  setOpen,
}: ServiceReviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-400/80">
          Reseñar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear una Reseña</DialogTitle>
          <DialogDescription>
            <p>
              Si el Solucionador hizo un buen trabajo, es recomendable dejar una
              reseña.
            </p>
          </DialogDescription>
        </DialogHeader>
        {/* <ReviewServiceForm /> */}
      </DialogContent>
    </Dialog>
  );
};
export default ServiceReviewModal;