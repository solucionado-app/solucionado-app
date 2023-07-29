import React from 'react'
import { useFormSteps } from './ContextForm';
import GeneralForm from './generalForm';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowBigLeft } from 'lucide-react';

const getDynamicForm = (slug: string) => dynamic(() => import(`~/components/formularios/${slug}Form`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
const getSecondStep = () => dynamic(() => import(`~/components/formularios/SecondStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
export default function FormAll() {
    const router = useRouter()
    const { currentStep, setCurrentStep } = useFormSteps();
    const DynamicForm = getDynamicForm(router.query.slug as string)
    const DynamicSecondStep = getSecondStep()
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    return (
        <>
            <div className='max-w-2xl w-full '>
                {currentStep > 0 && <div onClick={handlePreviousStep} className='flex items-center gap-2 mb-5 cursor-pointer w-fit'>
                    <ArrowBigLeft fill='' /> Volver
                </div>}
                <div className='max-w-md mx-auto'>
                    {currentStep === 0 && <GeneralForm />}
                    {currentStep === 1 && <DynamicSecondStep />}
                    {currentStep === 2 && <DynamicForm />}
                </div>
            </div>

        </>
    )
}
