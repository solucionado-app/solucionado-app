import React from "react";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EditUserDialog } from "../profile/EditUserDialog";

export const ProfileData = () => {
  const { data: user, isLoading } = api.user.getById.useQuery();
  if (!user) {
    return (
      <div className="h-96 w-full rounded-xl bg-white shadow">
        <h2>No pudimos obtener los datos</h2>
      </div>
    );
  }
  return (

    <>
      {isLoading && <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>}

      {!!user && <>
        <div className="my-8">
          <Avatar className="h-24 w-24">
            <AvatarFallback ><div className="animate-spin rounded-full  border-b-2 border-gray-900"></div></AvatarFallback>
            <AvatarImage
              src={user?.image_url || undefined}
              alt={`image of user ${user.email}`}
            />
          </Avatar>
        </div>
        <div className="p-4  min-h-[24rem] w-full  ">
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
                <label className="text-sm font-semibold text-solBlue">Nombre</label>
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
                <label className="text-sm font-semibold text-solBlue">Calle</label>
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
                <label className="text-sm font-semibold text-solBlue">CBU</label>
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
        </div> </>}
    </>
  );
};
