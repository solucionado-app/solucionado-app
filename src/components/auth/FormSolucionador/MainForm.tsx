import React, { useEffect } from 'react'
import FirstForm from './FirstForm';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowBigLeft } from 'lucide-react';
import { type FormValues, localStorageRequests } from '~/lib/localStorage';
import { useFormSteps } from './ContextSolucionadorForm';
import { useUser } from '@clerk/nextjs';


const getSecondStep = () => dynamic(() => import(`~/components/formularios/SecondStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
export default function MainForm() {
    const router = useRouter()
    const { currentStep, setCurrentStep } = useFormSteps();
    const DynamicSecondStep = getSecondStep()
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    // const local: FormValues = localStorageRequests.get()
    // const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug) && JSON.stringify(local[`${slug}`]) !== '{}';

    // useEffect(() => {
    //     if (hasCategoryInLocal) {

    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    //         const step: number = local[`${slug}`]?.currentStep as number
    //         if (!isNaN(step)) {
    //             setCurrentStep(step)
    //         }
    //     }
    // }, [local, hasCategoryInLocal, slug, setCurrentStep])

    return (
        <>
            <div className='max-w-2xl w-full '>
                {currentStep > 0 && <div onClick={handlePreviousStep} className='flex items-center gap-2 mb-5 cursor-pointer w-fit'>
                    <ArrowBigLeft fill='' /> Volver
                </div>}
                <div className='max-w-md w-full mx-auto flex flex-col'>
                    {currentStep === 0 && <FirstForm />}
                    {currentStep === 1 && <DynamicSecondStep />}
                </div>
            </div>
        </>
    )
}
