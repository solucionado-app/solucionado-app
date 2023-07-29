/* eslint-disable */
import React from 'react'
import { useQuery } from "@tanstack/react-query"
import Select from "react-select"
import { UseFormReturn } from 'react-hook-form';
import { FormDescription, FormControl, FormField, FormItem, FormMessage, FormLabel } from '../ui/form';

interface Province {
    id: string;
    nombre: string;
}
interface City {
    id: string;
    nombre: string;
}
interface Props {
    formGetValues: UseFormReturn<any>["getValues"],
    formSetValue: UseFormReturn<any>["setValue"],
    formControl: UseFormReturn<any>["control"],
}

export default function ProvinceAndCityOptions({ formGetValues, formSetValue, formControl }: Props) {
    const getProvinces = async () => {
        try {
            const res = await fetch('https://apis.datos.gob.ar/georef/api/provincias')
            const data = await res.json()
            return data
        }
        catch (res) {
            return res
        }
    }
    const queryprovinces = useQuery(["provinces"], getProvinces)
    const getCitys = async () => {
        const provinceName = formGetValues("province")?.nombre
        try {
            const res = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinceName}&max=300`)
            const data = await res.json()
            return data
        }
        catch (res) {
            return res
        }
    }
    const querycitys = useQuery(["citys"], getCitys, {
        enabled: Boolean(formGetValues("province")?.nombre),
    })

    return (
        <> <FormField
            control={formControl}
            name="province"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                        <Select
                            {...field}
                            styles={{
                                control: (styles) => ({
                                    ...styles,
                                    backgroundColor: 'white',
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    backgroundColor: 'white',
                                }),
                            }}
                            isLoading={queryprovinces.isLoading}
                            placeholder='Ingresa la provincia' options={queryprovinces.data?.provincias as Province[]}
                            getOptionLabel={(option: Province) => option?.nombre}
                            getOptionValue={(option: Province) => option?.id}
                            onChange={(option) => {
                                option && formSetValue("province", { id: option.id, nombre: option.nombre })
                                formSetValue("city", { id: "", nombre: "" })
                                querycitys.refetch()
                            }}
                        />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
            <FormField
                control={formControl}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                            <Select
                                {...field}
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        backgroundColor: 'white',
                                    }),
                                    menuList: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                    }),
                                }}
                                isLoading={querycitys.isLoading || querycitys.isFetching}
                                placeholder='Ingresa la ciudad' options={querycitys.data?.municipios as City[]}
                                getOptionLabel={(option: City) => option?.nombre}
                                getOptionValue={(option: City) => option?.id}
                            />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
