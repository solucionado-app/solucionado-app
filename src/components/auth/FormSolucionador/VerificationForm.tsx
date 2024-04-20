import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form"
import { Button } from "~/components/ui/button"
import CountdownTimer from "./countdown"
import { type PhoneNumberResource } from "@clerk/types/dist/phoneNumber"
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../ui/input-otp";


const codeSchema = z.object({
    code: z.string({ required_error: "Debes introducir un codigo" }).min(1, { message: "El codigo es requerido" })
});

export function VerificationForm({ onSubmit, phone, reAttemptVerification }: { onSubmit: (values: z.infer<typeof codeSchema>) => Promise<null | undefined>, phone: PhoneNumberResource, reAttemptVerification: () => void }) {
    const verificationForm = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: "",
        }
    })
    const [countdown, setCountdown] = useState(0);

    const handleResendClick = () => {
        setCountdown(30);
        reAttemptVerification();
    }

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [countdown]);
    return (
        <Form {...verificationForm}>
            <h3>Verificacion</h3>
            {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={verificationForm.handleSubmit(onSubmit)} className="space-y-2 w-full">
                <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem  >
                            <FormLabel>Codigo</FormLabel>
                            <FormControl>

                                    <InputOTP className="max-w-fit " maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                            </FormControl>
                            {/* <FormDescription>
                                Se envio un codigo a {phone?.phoneNumber} si no te ha llegado presiona aqui para <span onClick={reAttemptVerification} className="text-blue-500 cursor-pointer">reenviar</span>
                                {phone?.verification?.expireAt ? <CountdownTimer expireAt={phone?.verification?.expireAt} /> : null}
                            </FormDescription> */}
                            <FormDescription>
                                Se envio un codigo a {phone?.phoneNumber} si no te ha llegado presiona aqui para <button onClick={handleResendClick} className={`text-blue-500 cursor-pointer ${countdown > 0 ? 'opacity-50' : ''}`} disabled={countdown > 0} >reenviar</button>
                                {countdown > 0 && <span> Puedes reenviar en {countdown} segundos</span>}
                                {phone?.verification?.expireAt ? <CountdownTimer expireAt={phone?.verification?.expireAt} /> : null}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">Verificar</Button>
            </form>
        </Form>
    )
}