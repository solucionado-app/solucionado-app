import React, { useEffect } from 'react'
import FirstForm from './FirstForm';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowBigLeft } from 'lucide-react';
import { localRegisterSolucionador, type RegisterSolucionadorFormValues } from '~/lib/localStorage';
import { useFormSteps } from './ContextSolucionadorForm';
import { useUser } from '@clerk/nextjs';
import ProgressBar from './ProgressBar';
import { Button } from '@/app/ui/button';
import Confetti from './ConfettiStep';


const getThirdStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/ThirdStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})

const getSecondStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/SecondStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})

const getFourthStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/FourthStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})

const getFifthStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/FifthStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
const getSixthStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/SixthStep`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
export default function MainForm() {
    const router = useRouter()
    const { currentStep, setCurrentStep } = useFormSteps();
    const DynamicSecondStep = getSecondStep()
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const DynamictThirdStep = getThirdStep()
    const DynamicFourthStep = getFourthStep()
    const DynamicFifthStep = getFifthStep()
    const DynamicSixthStep = getSixthStep()


    // const local: FormValues = localRegisterSolucionador.get()
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
                {currentStep > 0 && currentStep < 6 && <div onClick={handlePreviousStep} className='flex items-center gap-2 mb-5 cursor-pointer w-fit'>
                    <ArrowBigLeft fill='' /> Volver
                </div>}
                <ProgressBar totalSteps={6} currentStep={currentStep} />
                <div className='max-w-sm w-full md:w-96 mx-auto flex flex-col'>
                    {currentStep === 0 && <FirstForm />}
                    {currentStep === 1 && <DynamicSecondStep />}
                    {currentStep === 2 && <DynamictThirdStep />}
                    {currentStep === 3 && <DynamicFourthStep />}
                    {currentStep === 4 && <DynamicFifthStep />}
                    {currentStep === 5 && <DynamicSixthStep />}
                    {currentStep === 6 && <Confetti />}


                </div>
            </div>
        </>
    )
}
