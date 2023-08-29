import React, { type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

interface EditUserDialogProps {
  image: File;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
export const EditImageDialog: React.FC<EditUserDialogProps> = ({
  image,
  open,
  setOpen,
}) => {
  const urlImage = URL.createObjectURL(image);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar Imagen</DialogTitle>
          <DialogDescription>
            <Image
              src={urlImage}
              width={100}
              height={100}
              alt="prev image to update"
              className="object-contain"
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
