import React from "react";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";
import { Avatar, AvatarImage } from "../ui/avatar";
import { EditUserDialog } from "../profile/EditUserDialog";

export const ProfileData = () => {
  const { data } = api.user.getById.useQuery();
  if (!data) {
    return (
      <div className="h-96 w-full rounded-xl bg-white shadow">
        <h2>No pudimos obtener los datos</h2>
      </div>
    );
  }
  return (
    <>
      <div className="my-8">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={data.image_url!}
            alt={`image of user ${data.email}`}
          />
        </Avatar>
      </div>

      <div className="flex min-h-[24rem] w-full flex-col justify-center space-y-4 rounded-xl bg-white p-4 shadow">
        <div>
          <EditUserDialog user={data} />
        </div>
        <form className="grid w-full auto-rows-auto grid-cols-1 gap-8  sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-solBlue">
              Correo Electronico
            </label>
            <Input
              type="email"
              value={data.email}
              readOnly
              className="outline-none ring-0 focus:outline-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-solBlue">Nombre</label>
            <Input
              type="text"
              value={data.first_name ?? "-"}
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
              value={data.last_name ?? "-"}
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
              value={data.phone ?? "-"}
              readOnly
              className="outline-none ring-0 focus:outline-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-solBlue">Calle</label>
            <Input
              type="text"
              value={data.address ?? "-"}
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
              value={data.dni ?? "-"}
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
              value={data.cuit ?? "-"}
              readOnly
              className="outline-none ring-0 focus:outline-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-solBlue">CBU</label>
            <Input
              type="text"
              value={data.cbu ?? "-"}
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
              value={new Date(data.createdAt).toLocaleDateString()}
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
    </>
  );
};
