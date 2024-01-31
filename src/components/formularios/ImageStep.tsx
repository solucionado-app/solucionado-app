/* eslint-disable */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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

import { Textarea } from "../ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover"
import { format, set } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Calendar } from "../ui/calendar"

import es from 'date-fns/locale/es';
import { sendEmail, useFormSteps } from "./ContextForm"
import { FormValues, localStorageRequests } from "~/lib/localStorage"

import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import { Console } from "console"
import Submitbutton from "../auth/FormSolucionador/Submitbutton"
import { useUser } from "@clerk/nextjs"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"

const locale = es;



const formSchema = z.object({
    photos: z.any().optional(),
    portrait: z.any().optional(),
});



export default function ImageStep() {
    const router = useRouter()
    const slug = router.query.slug as string;
    const { currentStep, setCurrentStep, isSubmitting, handleSubmition } = useFormSteps();
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug) && JSON.stringify(local[`${slug}`]) !== '{}';
    const [photos, setPhotos] = useState<File[]>([]);
    const [portrait, setPortrait] = useState<File>();
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [previewPortraitUrl, setpreviewPortraitUrl] = useState<string>();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            photos: [],
            portrait: '',
        }

    })
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const { setError } = form;

    const { isSignedIn } = useUser()

    const [open, setOpen] = useState(false)

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (photos.length > 3) {
            setError("photos", {
                type: "max",
                message: "Solo puedes subir hasta 3 fotos.",
            });
            return;
        }
        if (portrait && portrait.size > 5000000) {
            setError("portrait", {
                type: "size",
                message: "El tamaño del archivo del retrato no debe superar los 5MB.",
            });
            return;
        }
        if (photos.some(file => file.size > 5000000)) {
            setError("photos", {
                type: "size",
                message: "El tamaño del archivo de la foto no debe superar los 5MB.",
            });
            return;
        }
        if (photos.some(file => !['image/png', 'image/jpeg'].includes(file.type))) {
            setError("photos", {
                type: "format",
                message: "El formato del archivo de la foto debe ser PNG o JPEG.",
            });
            return;
        }
        if (portrait && !['image/png', 'image/jpeg'].includes(portrait.type)) {
            setError("portrait", {
                type: "format",
                message: "El formato del archivo del retrato debe ser PNG o JPEG.",
            });
            return;
        }
        if (!!slug) {
            localStorageRequests.set({ ...localStorageRequests.get(), [slug]: { ...local[`${slug}`], photos, portrait, currentStep: slug === 'electricistas' ? currentStep : currentStep + 1 } })
            if (!isSignedIn) {
                setOpen(true)
                return
            }
            else {
                if (slug === 'electricistas') {
                    console.log('cotizar')
                    handleSubmition(local[`${slug}`])
                }
                else {
                    console.log('siguiente')
                    handleNextStep()
                }
            }
        }

    }



    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}

                        name="photos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagenes del servicio</FormLabel>
                                <FormControl>
                                    <Input type="file"
                                        {...form.register('photos', {
                                            validate: {
                                                validType: (files: File[]) => Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type)) || 'Invalid file type',
                                                validSize: (files: File[]) => Array.from(files).every(file => file.size <= 5000000) || 'Invalid file size',
                                            }
                                        })}
                                        multiple
                                        accept="image/png, image/jpeg, image/webp" // Only accept png and jpeg files
                                        onChangeCapture={(e) => {
                                            const target = e.target as HTMLInputElement;

                                            // Clear any existing errors
                                            form.clearErrors('photos');

                                            // Validate the file size and type
                                            if (target.files) {
                                                const files = Array.from(target.files).slice(0, 3);
                                                const invalidFiles = files.filter(file => file.size > 5000000 || !['image/png', 'image/jpeg'].includes(file.type));

                                                if (invalidFiles.length > 0) {
                                                    // Set our own error if we encounter an invalid file
                                                    console.log('invalidFiles', invalidFiles)
                                                    form.setError('photos', { type: 'manual', message: 'Invalid file size or type' });
                                                    return;
                                                }



                                                // Generate the previ   ew URLs and store them in the state
                                                const urls = files.map(file => URL.createObjectURL(file));
                                                field.value = files;
                                                console.log(urls)
                                                console.log(files)
                                                field.onChange(target.files); // Notify react-hook-form about the change

                                                setPhotos(files);
                                                setPreviewUrls(urls);
                                            }
                                        }}
                                        placeholder="Arrastra un archivo aca" {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {"Sube imagenes descriptivas de la solicitud de servicio (opcional) para subir mas de un archivo selecciona todos los archivos a la vez. (maximo 3)"}
                                </FormDescription>
                                <FormMessage />
                                <div className="flex flex-wrap gap-3">
                                    {previewUrls.map((url, index) => (
                                        <img key={index} src={url} alt="Preview" style={{ width: '100px', height: '100px' }} />
                                    ))}
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        {...form.register('portrait', {
                            validate: {
                                validType: (file: File) => ['image/png', 'image/jpeg'].includes(file.type) || 'Invalid file type',
                                validSize: (file: File) => file.size <= 5000000 || 'Invalid file size',
                            }
                        })}
                        name="portrait"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen de portada</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        accept="image/png, image/jpeg" // Only accept png and jpeg files
                                        type="file" placeholder="Arrastra un archivo aca"
                                        onChange={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            field.onChange(e);

                                            // Clear any existing errors
                                            form.clearErrors('portrait');

                                            // Validate the file size and type
                                            if (target.files) {
                                                const file = target.files[0]; // Get the first file
                                                if (!file) return
                                                if (file.size > 5000000 || !['image/png', 'image/jpeg'].includes(file.type)) {
                                                    // Set our own error if we encounter an invalid file
                                                    console.log('invalidFile', file)
                                                    form.setError('photos', { type: 'manual', message: 'Invalid file size or type' });
                                                    return;
                                                }
                                                // Notify react-hook-form about the change

                                                console.log(field.value)

                                                // Generate the preview URL and store it in the state
                                                const url = URL.createObjectURL(file);

                                                field.value = file;
                                                setPortrait(file);
                                                setpreviewPortraitUrl(url);
                                            }
                                        }} />
                                </FormControl>
                                <FormDescription>
                                    {"Sube una imagen de portada para la solicitud de servicio (opcional)"}
                                </FormDescription>
                                <FormMessage />
                                <div className="flex flex-wrap gap-3">
                                    {previewPortraitUrl && (
                                        <img src={previewPortraitUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />
                    <Submitbutton isLoading={isSubmitting} text={slug === 'electricistas' ? 'Cotizar' : 'Siguiente'} />
                </form>
                <DialogAuthConfirmation open={open} setOpen={setOpen} />
            </Form>


        </>
    )
}