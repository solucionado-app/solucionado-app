/* eslint-disable @typescript-eslint/no-misused-promises */
// import React from "react";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EditUserDialog } from "../profile/EditUserDialog";
import { EditIcon, User2 } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import Spinner from "../ui/spinner";

export const ProfileData = () => {
  const { data: user, isLoading, refetch } = api.user.getById.useQuery();
  const { user: clerkUser } = useUser();
  const { toast } = useToast();
  const [isUpdatingImage, setIsUpdatingImage] = useState<boolean>(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  if (!user) {
    return (
      <div className="h-96 w-full rounded-xl bg-white shadow">
        <h2>No pudimos obtener los datos</h2>
      </div>
    );
  }
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUpdatingImage(true);
      const file = e.target.files?.[0] ?? null;
      const resp = await clerkUser?.setProfileImage({ file });
      setPublicUrl(resp?.publicUrl ?? null);
      setIsUpdatingImage(false);
      void refetch();

      toast({
        title: "Imagen actualizada",
        description: "",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      setPublicUrl(null);
      setIsUpdatingImage(false);
      toast({
        title: "No se pudo actualizar la imagen",
        description: "Por favor, intentelo de nuevo.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}

      {!!user && (
        <>
          <div className="relative my-8">
            <Avatar className="h-24 w-24 bg-white shadow">
              <AvatarFallback>
                <div className="animate-spin rounded-full  border-b-2 border-gray-900" />
              </AvatarFallback>
              {isUpdatingImage ? (
                <Skeleton className="flex h-full w-full animate-pulse items-center justify-center rounded-full">
                  <User2 className="h-12 w-12 animate-pulse text-gray-400" />
                </Skeleton>
              ) : (
                <AvatarImage
                  src={publicUrl ?? (clerkUser?.profileImageUrl || undefined)}
                  alt={`image of user ${user.email}`}
                  className="object-contain p-1"
                />
              )}
            </Avatar>
            <div className="absolute -bottom-4 right-0 cursor-pointer rounded-full border border-gray-300 bg-white p-2">
              <EditIcon className="h-4 w-4 cursor-pointer text-black" />

              <input
                type="file"
                name="picture"
                className="absolute bottom-0 left-0 right-0 top-0 cursor-pointer opacity-0"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="min-h-[24rem]  w-full p-4  ">
            <div className="flex min-h-[24rem] w-full flex-col justify-center space-y-4 rounded-xl bg-white p-4 shadow">
              <div>
                <EditUserDialog user={user} />
              </div>
              <form className="grid w-full auto-rows-auto grid-cols-1 gap-8  sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Correo Electronico
                  </label>
                  <Input
                    type="email"
                    value={user.email}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Nombre
                  </label>
                  <Input
                    type="text"
                    value={user.first_name ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Apellido
                  </label>
                  <Input
                    type="text"
                    value={user.last_name ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Telefono
                  </label>
                  <Input
                    type="phone"
                    value={user.phone ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Calle
                  </label>
                  <Input
                    type="text"
                    value={user.address ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Documento de Identidad
                  </label>
                  <Input
                    type="text"
                    value={user.dni ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    CUIT/CUIL
                  </label>
                  <Input
                    type="text"
                    value={user.cuit ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    CBU
                  </label>
                  <Input
                    type="text"
                    value={user.cbu ?? "-"}
                    readOnly
                    className="outline-none ring-0 focus:outline-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-solBlue">
                    Fecha de Creación
                  </label>
                  <Input
                    type="text"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    readOnly
                  />
                </div>
                {/* <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telofono</FormLabel>
                            <FormControl>
                                <Input placeholder="ej: 2984694512" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dni</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domiciolio Actual</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
              </form>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};
