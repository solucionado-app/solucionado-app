/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { z } from 'zod';
import Select from 'react-select'
import { api } from "~/utils/api";

interface FormSchemaType {
    phone: string,
    dni: string,
    address: string,
    profile_url: string,
    cbu: string,
    cuit: string,
    categories: Array<{
        id: number,
        name: string,
        description: string,
    }>
}

const RegisterSolucionadorUser = () => {
    const phoneRegex = new RegExp(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );
    const apitrcp = api.categories.getAll.useQuery();
    const { data: categories } = apitrcp;

    console.log(categories);

    const formSchema = z.object({
        phone: z.string().min(1, { message: "El telefono es requerido" }).regex(phoneRegex, 'Invalid Number!'),
        dni: z.string().min(1, { message: "El dni es requerido" }),
        address: z.string().min(1, { message: "La direccion es requerida" }),
        cuit: z.string().min(1, { message: "El cuit es requerido" }),
        cbu: z.string().min(1, { message: "El cbu es requerido" }),
        categories: z.array(z.object({
            id: z.number(),
            name: z.string(),
            description: z.string(),
        })).min(1, { message: "La categoria es requerida" }),
    });

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        console.log('submit', data);
    };
    console.log(form)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={``}
        >
            <div className={'flex flex-col gap-2 p-4'}>
                <div className="grid grid-cols-2 gap-5  ">

                    <div className="flex flex-col ">
                        <label className="font-bold text-lg mb-1 " htmlFor="firstName">
                            Telefono
                        </label>
                        <input
                            id='phone'
                            className={` ${errors.phone ? 'text-red-500 border-red-500/50 ' : 'border-gray-500 dark:border-gray-400'} border py-2 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                            {...register("phone")}

                        />
                        <p className={` ${errors.phone ? 'text-red-500 block' : 'invisible'}  `}>{errors.phone?.message}</p>

                    </div>
                    <div className="flex flex-col ">
                        <label className="font-bold text-lg mb-1 " htmlFor="lastName">
                            Dni
                        </label>
                        <input
                            id='dni'
                            className={` ${errors.dni ? 'text-red-500 border-red-500/50 ' : 'border-gray-500 dark:border-gray-400'} border py-2 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                            {...register("dni")}
                        />
                        <p className={` ${errors.dni ? 'text-red-500 block' : 'invisible'}  `}>{errors.dni?.message}</p>
                    </div>
                </div>

                <div className="flex flex-col  ">
                    <label className="font-bold text-lg mb-1 " htmlFor="email">
                        Dirección
                    </label>
                    <input
                        className={` ${errors.address ? 'text-red-500 border-red-500/50 ' : 'border-gray-500 dark:border-gray-400'} border py-2 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                        type="address"
                        id="address"
                        {...register("address")}
                    />
                    <p className={` ${errors.address ? 'text-red-500 block' : 'invisible'} `}>{errors.address?.message}</p>
                </div>

                <div className="flex flex-col gap-2  ">
                    <label className="font-bold text-lg mb-1 " htmlFor="email">
                        CBU O CVU
                    </label>
                    <input
                        className={` ${errors.cbu ? 'text-red-500 border-red-500/50 ' : 'border-gray-500 dark:border-gray-400'} border py-2 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                        id="cbu"
                        {...register("cbu")}
                    />
                    <p className={` ${errors.cbu ? 'text-red-500 block' : 'invisible'} `}>{errors.cbu?.message}</p>
                </div>
                <div className="flex flex-col   ">
                    <label className="font-bold text-lg mb-1 " htmlFor="email">
                        CUIT – CUIL
                    </label>
                    <input
                        className={` ${errors.cuit ? 'text-red-500 border-red-500/50 ' : 'border-gray-500 dark:border-gray-400'} border py-2 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                        id="cuit"
                        {...register("cuit")}
                    />
                    <p className={` ${errors.cuit ? 'text-red-500 block' : 'invisible'} `}>{errors.cuit?.message}</p>
                </div>

                <div className="flex flex-col mt-1   ">
                    <label className="font-bold text-lg mb-1 " htmlFor="email">
                        Categorias
                    </label>
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => <Select
                            {...field}
                            styles={{
                                control: (styles) => ({
                                    ...styles,
                                    backgroundColor: 'white',
                                    borderColor: errors.categories ? "rgb(239 68 68 / 0.5)" : 'gray',
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    backgroundColor: 'white',
                                }),
                            }}
                            isMulti placeholder='Elige las categorias' options={categories}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id.toString()}
                        />}
                    />
                    {/* <Select {...register("categories")} isMulti placeholder='Ingresa una Ciudadd' options={categories}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id.toString()}
                    /> */}
                    <p className={` ${errors.categories ? 'text-red-500 block' : 'invisible'} `}>{"La categoria es requerida"}</p>
                </div>



                <button
                    className='block  text-gray-50 bg-sky-500 text-lg mb-1 rounded py-2.5 w-full'
                    type="submit"
                    disabled={isSubmitting}
                >
                    Registrarse
                </button>
            </div>
        </form>
    );
};

export default RegisterSolucionadorUser;