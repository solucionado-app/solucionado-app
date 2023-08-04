import React, { useEffect } from 'react'
import { useFormSteps } from './ContextForm';
import GeneralForm from './generalForm';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowBigLeft } from 'lucide-react';
import { type FormValues, localStorageRequests } from '~/lib/localStorage';

const getDynamicForm = (slug: string) => dynamic(() => import(`~/components/formularios/${slug}Form`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
const getSecondStep = () => dynamic(() => import(`~/components/formularios/SecondStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
export default function FormAll() {
    const router = useRouter()
    const { currentStep, setCurrentStep } = useFormSteps();
    const slug = router.query.slug as string
    const DynamicForm = getDynamicForm(slug)
    const DynamicSecondStep = getSecondStep()
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug) && JSON.stringify(local[`${slug}`]) !== '{}';

    useEffect(() => {
        if (hasCategoryInLocal) {

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const step: number = local[`${slug}`]?.currentStep as number
            if (!isNaN(step)) {
                setCurrentStep(step)
            }

        }
    }, [local, hasCategoryInLocal, slug, setCurrentStep])

    return (
        <>
            <div className='max-w-2xl w-full '>
                {currentStep > 0 && <div onClick={handlePreviousStep} className='flex items-center gap-2 mb-5 cursor-pointer w-fit'>
                    <ArrowBigLeft fill='' /> Volver
                </div>}
                <div className='max-w-md mx-auto flex flex-col'>
                    {currentStep === 0 && <GeneralForm />}
                    {currentStep === 1 && <DynamicSecondStep />}
                    {currentStep === 2 && <DynamicForm />}
                </div>
            </div>

        </>
    )
}
