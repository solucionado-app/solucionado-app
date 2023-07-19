/* eslint-disable @typescript-eslint/no-misused-promises */

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { z } from 'zod';

interface FormSchemaType {
    phone: string,
    dni: string,
    address: string,
    profile_url: string,
    cbu: string,
    cuit: string,
}

const RegisterCommonUser = () => {
    const phoneRegex = new RegExp(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );

    const formSchema = z.object({
        phone: z.string().min(1, { message: "El telefono es requerido" }).regex(phoneRegex, 'Invalid Number!'),
        dni: z.string().min(1, { message: "El dni es requerido" }),
        address: z.string().min(1, { message: "La direccion es requerida" }),
        cuit: z.string().min(1, { message: "El cuit es requerido" }),
        cbu: z.string().min(1, { message: "El cbu es requerido" }),
    });

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });
    const {
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
            <div className={'flex-col'}>
                <div className="grid grid-cols-2 gap-5  ">

                    <div className="flex flex-col ">
                        <label className="font-bold text-lg mb-1" htmlFor="firstName">
                            Telefono
                        </label>
                        <input
                            id='phone'
                            className={` ${errors.phone ? 'text-red-500 border-red-500 ' : 'border-gray-500 dark:border-gray-400'} border-2 py-1 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                            {...register("phone")}

                        />
                        <p className={` ${errors.phone ? 'text-orange-high block' : 'invisible'}  `}>{errors.phone?.message}</p>

                    </div>
                    <div className="flex flex-col ">
                        <label className="font-bold text-lg mb-1" htmlFor="lastName">
                            Dni
                        </label>
                        <input
                            id='dni'
                            className={` ${errors.dni ? 'text-red-500 border-red-500 ' : 'border-gray-500 dark:border-gray-400'} border-2 py-1 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                            {...register("dni")}
                        />
                        <p className={` ${errors.dni ? 'text-orange-high block' : 'invisible'}  `}>{errors.dni?.message}</p>
                    </div>
                </div>

                <div className="flex flex-col  ">
                    <label className="font-bold text-lg mb-1" htmlFor="email">
                        Dirección
                    </label>
                    <input
                        className={` ${errors.address ? 'text-red-500 border-red-500 ' : 'border-gray-500 dark:border-gray-400'} border-2 py-1 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                        type="address"
                        id="address"
                        {...register("address")}
                    />
                    <p className={` ${errors.address ? 'text-orange-high block' : 'invisible'} `}>{errors.address?.message}</p>
                </div>

                <div className="flex flex-col  ">
                    <label className="font-bold text-lg mb-1" htmlFor="email">
                        CBU O CVU
                    </label>
                    <input
                        className={` ${errors.cbu ? 'text-red-500 border-red-500 ' : 'border-gray-500 dark:border-gray-400'} border-2 py-1 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                        id="cbu"
                        {...register("cbu")}
                    />
                    <p className={` ${errors.cbu ? 'text-orange-high block' : 'invisible'} `}>{errors.cbu?.message}</p>
                </div>
                <div className="flex flex-col  ">
                    <label className="font-bold text-lg mb-1" htmlFor="email">
                        CUIT – CUIL
                    </label>
                    <input
                        className={` ${errors.cuit ? 'text-red-500 border-red-500 ' : 'border-gray-500 dark:border-gray-400'} border-2 py-1 px-2  rounded-md outline-none focus:border-blue-500 bg-transparent`}
                        id="cuit"
                        {...register("cuit")}
                    />
                    <p className={` ${errors.cuit ? 'text-orange-high block' : 'invisible'} `}>{errors.cuit?.message}</p>
                </div>


                <button
                    className='block mb-6 text-gray-900 bg-orange-pastel text-lg rounded py-2.5 w-full'
                    type="submit"
                    disabled={isSubmitting}
                >
                    Registrarse
                </button>
            </div>
        </form>
    );
};

export default RegisterCommonUser;