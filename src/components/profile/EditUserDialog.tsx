import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { User } from "@prisma/client";
import { EditUserForm } from "./EditUserForm";
import { EditSolucionadorDialog } from "./EditSolucionadorDialog";
interface EditUserDialogProps {
  user: User;
}
export const EditUserDialog: React.FC<EditUserDialogProps> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="bg-solBlue text-white hover:bg-solBlue/80 hover:text-white"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-solBlue">
            Actualizar Datos
          </DialogTitle>
        </DialogHeader>
        {user.role !== "SOLUCIONADOR" ? (
          <EditUserForm userData={user} closeDialog={setOpen} />
        ) : (
          <EditSolucionadorDialog userData={user} closeDialog={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};
