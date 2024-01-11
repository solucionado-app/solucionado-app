/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PhoneNumberResource } from "@clerk/types/dist/phoneNumber"
import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { useForm } from "react-hook-form";
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { TrophyIcon } from "lucide-react"
import { format } from "util"
import CountdownTimer from "./countdown"


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
    phone: z.string({ required_error: "Debes introducir un numero de telefono" }).min(1, { message: "El telefono es requerido" }).regex(phoneRegex, 'Invalid Number!'),
});

const codeSchema = z.object({
    code: z.string({required_error: "Debes introducir un codigo"}).min(1, { message: "El codigo es requerido" })
});


export default function FirtForm() {
    const { user, isSignedIn } = useUser()
    const [verifying, setVerifying] = useState(false)
    const [phone, setPhone] = useState<PhoneNumberResource>() 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        }
    })

    const verificationForm = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: "",
        }
    })

    const { data: categories, isLoading } = api.categories.getAll.useQuery();
    const { mutate } = api.user.update.useMutation()
    // 1. Define your form.
    
    // console.log(user?.phoneNumbers)
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSignedIn) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newPhoneNumber = '+549' + values.phone
        console.log('values',values, id)
        console.log(user.phoneNumbers)
        if (user?.phoneNumbers && user?.phoneNumbers.length > 0) {
           const exitingPhone= user?.phoneNumbers.find( (phone) => {
                console.log(phone)
                console.log(phone.phoneNumber)
                console.log(newPhoneNumber)
            return phone.phoneNumber === newPhoneNumber})
           console.log('existiendo',exitingPhone)

            if (exitingPhone) {
                try {
                    const code = await exitingPhone.prepareVerification()
                    console.log(code)
                    console.log('existiendo')
                    console.log(exitingPhone)
                    setPhone(code)
                    setVerifying(true)
                    verificationForm.reset()
                }
                catch(error){
                    let {message} = error as { message: string }
                    form.setError('phone', {message})
                    console.log(error)
                }
            }
        }

        else {


            try {
                const updated = await user.createPhoneNumber({ phoneNumber: newPhoneNumber })
                const code = await updated.prepareVerification()

                console.log(code)
                console.log(updated)
                verificationForm.reset()
                setPhone(updated)
                setVerifying(true)

            } catch (error) {
                let {message} = error as { message: string }
                form.setError('phone', { message})
                console.log(error)
            }
        }
    }
    const onSubmitCode = async (values: z.infer<typeof codeSchema>) => {
        if (!isSignedIn || !phone) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(phone)
        console.log(values.code)
        try {
            await phone.attemptVerification({ code: values.code })
        }
        catch (error) {
            let {errors} = error as { errors : {message: string}[]}
            verificationForm.setError('code', { message: errors[0]?.message})
            console.log(verificationForm.getFieldState('code'))

            console.log(error, errors[0]?.message)
        }
    }

    const reAttemptVerification = async () => {
        if (!isSignedIn || !phone) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(phone)
        try {
            await phone.prepareVerification()
            verificationForm.reset()

        }
        catch (error ) {
            let {message} = error as { message: string }
            verificationForm.setError('code', { message: message})

            console.log(error)
        }
    }

    if (verifying) return (
        <Form {...verificationForm}>
            <h3>Verificacion</h3>
            <form onSubmit={verificationForm.handleSubmit(onSubmitCode)} className="space-y-2 w-full">
                <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Codigo</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} value={field.value} />
                            </FormControl>
                            <FormDescription>
                            Se envio un codigo a {phone?.phoneNumber} si no te ha llegado presiona aqui para <span onClick={reAttemptVerification} className="text-blue-500 cursor-pointer">reenviar</span>

                            { phone?.verification?.expireAt ? <CountdownTimer expireAt={phone?.verification?.expireAt}/> : null}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Verificar</Button>
            </form>
        </Form>
    )
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
    
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telofono</FormLabel>
                                <FormControl>
                                    <Input placeholder="ej: 2984694512" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enviaremos un codigo de verificacion a este numero con una expiracion de 10min.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                   
                    <Button type="submit">Siguiente</Button>
                </form>
            </Form>
        )
    
    
}