/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { type PhoneNumberResource } from "@clerk/types/dist/phoneNumber"
import { useForm } from "react-hook-form";
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"

import { useFormSteps } from "./ContextSolucionadorForm"
import { type RegisterSolucionadorFormValues, localRegisterSolucionador } from "@/src/lib/localStorage"
import { isValidPhoneNumber } from "react-phone-number-input";
import { VerificationForm } from "./VerificationForm";
import { PhoneNumberForm } from "./PhoneNumberForm";
import { ArrowBigLeft } from "lucide-react";


const formSchema = z.object({
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Numero de telefono invalido" }),
});

const codeSchema = z.object({
    code: z.string({ required_error: "Debes introducir un codigo" }).min(1, { message: "El codigo es requerido" })
});


export default function FirstForm2() {
    const { user, isSignedIn } = useUser()
    const [verifying, setVerifying] = useState(false)
    const [phone, setPhone] = useState<PhoneNumberResource>()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
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



    const { currentStep, setCurrentStep } = useFormSteps();
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const { mutate } = api.user.update.useMutation()

    // 1. Define your form.

    // console.log(user?.phoneNumbers)
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSignedIn) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newPhoneNumber = values.phone.replace('+54', '+549');
        console.log('values', values, newPhoneNumber, id)
        //  if (user.id === 'user_2aEYpsnkUQjrD1kNxkagEcYXQ0N') {
        //      user?.phoneNumbers.map( (phone) => {
        //          console.log(phone)
        //          console.log(phone.phoneNumber)
        //          console.log(newPhoneNumber)
        //          phone.destroy().finally(() => {console.log('destruido')})
        //          return phone
        //      })
        //      return
        //  }

        console.log(user.phoneNumbers)
        if (user?.phoneNumbers && user?.phoneNumbers.length > 0) {

            const exitingPhone = user?.phoneNumbers.find((phone) => {
                console.log(phone)
                console.log(phone.phoneNumber)
                console.log(newPhoneNumber)
                return phone.phoneNumber === newPhoneNumber
            })
            console.log('existiendo', exitingPhone)
            if (user.hasVerifiedPhoneNumber && exitingPhone) {
                console.log('verificado')
                const newLocal: RegisterSolucionadorFormValues = {
                    ...local,
                    phone: values.phone,
                }
                localRegisterSolucionador.set(newLocal)
                handleNextStep()
                return
            }
            if (!!exitingPhone) {
                try {
                    console.log('existiendo')
                    const code = await exitingPhone.prepareVerification()
                    console.log(code)
                    console.log(exitingPhone)
                    setPhone(code)
                    setVerifying(true)
                }
                catch (error) {
                    const { message } = error as { message: string }
                    form.setError('phone', { message })
                    console.log(error)
                }
            }
            else {

                try {
                    user?.phoneNumbers.map(async(phone) => {
                        await phone.destroy()
                        return phone
                    })
                    const updated = await user.createPhoneNumber({ phoneNumber: newPhoneNumber })
                    console.log(updated)
                    const code = await updated.prepareVerification()
                    console.log(code)
                    setPhone(code)
                    setVerifying(true)
                } catch (error) {
                    const { message } = error as { message: string }
                    form.setError('phone', { message: message })
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
                setPhone(code)
                setVerifying(true)



            } catch (error) {
                const { message } = error as { message: string }
                form.setError('phone', { message: message })
                console.log(error)
            }
        }
    }

    async function onSubmitCode(values: z.infer<typeof codeSchema>) {
        if (!isSignedIn || !phone) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(phone)
        console.log(values.code)
        try {
            await phone.attemptVerification({ code: values.code })
            mutate({
                phone: phone.phoneNumber,
                userId: id,
            }, {
                onSuccess: () => {
                    const newLocal: RegisterSolucionadorFormValues = {
                        ...local,
                        phone: phone.phoneNumber
                    }
                    localRegisterSolucionador.set(newLocal)
                    handleNextStep()
                }
            })
        }
        catch (error) {
            const { errors } = error as { errors: { message: string }[] }
            verificationForm.setError('code', { message: errors[0]?.message })
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
        catch (error) {
            const { message } = error as { message: string }
            verificationForm.setError('code', { message: message })

            console.log(error)
        }
    }

    const handlePreviousStep = () => {
        setPhone(undefined)
        setVerifying(false)
    }
    if (verifying && phone) {
        return (
            <>
                <div className='flex items-center gap-2 mb-5 cursor-pointer w-fit' onClick={handlePreviousStep}>
                    <ArrowBigLeft fill='' /> Volver
                </div>
                <VerificationForm onSubmit={onSubmitCode} phone={phone} reAttemptVerification={reAttemptVerification} />
            </>
        )
    }

    return <PhoneNumberForm onSubmit={onSubmit} />


}