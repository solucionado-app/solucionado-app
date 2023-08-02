import React from "react";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

export const ProfileData = () => {
  const { data } = api.user.getById.useQuery();
  console.log(data);
  if (!data) {
    return (
      <div className="roundex-cl h-96 w-full bg-white shadow">
        <h2>No pudimos obtener los datos</h2>
      </div>
    );
  }
  return (
    <div className="flex min-h-[24rem] w-full items-center rounded-xl bg-white shadow ">
      <form className="grid w-full auto-rows-auto grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3">
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
          <label className="text-sm font-semibold text-solBlue">Apellido</label>
          <Input
            type="text"
            value={data.last_name ?? "-"}
            readOnly
            className="outline-none ring-0 focus:outline-transparent"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-solBlue">Telefono</label>
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
  );
};
