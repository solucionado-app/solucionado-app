import React from 'react'
import FirstForm from './FirstForm2';
import dynamic from 'next/dynamic';
import { ArrowBigLeft } from 'lucide-react';
import { useFormSteps } from './ContextSolucionadorForm';
import ProgressBar from './ProgressBar';
import Confetti from './ConfettiStep';
import Spinner from '../../ui/spinner';
import { useUser } from '@clerk/nextjs';


const getThirdStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/ThirdStep`), {
    loading: () => <Spinner className='w-16 h-16' />,
    ssr: false
})

const getSecondStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/SecondStep`), {
    loading: () => <Spinner className='w-16 h-16' />,
    ssr: false
})

const getFourthStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/FourthStep`), {
    loading: () => <Spinner className='w-16 h-16' />,
    ssr: false
})

const getFifthStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/FifthStep`), {
    loading: () => <Spinner className='w-16 h-16' />,
    ssr: false
})
const getSixthStep = () => dynamic(() => import(`~/components/auth/FormSolucionador/SixthStep`), {
    loading: () => <Spinner className='w-16 h-16' />,
    ssr: false
})

const DynamictThirdStep = getThirdStep()
const DynamicFourthStep = getFourthStep()
const DynamicFifthStep = getFifthStep()
const DynamicSixthStep = getSixthStep()
const DynamicSecondStep = getSecondStep()

export default function MainForm() {
    const {user} = useUser()
    const userMetadata = user?.unsafeMetadata;
    const role = userMetadata?.role
    const isSolucionador = role === 'SOLUCIONADOR'
    const { currentStep, setCurrentStep ,isLoadingStep } = useFormSteps();
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    if(isLoadingStep) {
        return <Spinner className='w-16 h-16' />
    }
    return (
        <>
            <div className='max-w-2xl w-full '>
                {currentStep > 0 && (isSolucionador ? currentStep < 6 : currentStep <5) && <div onClick={handlePreviousStep} className='flex items-center gap-2 mb-5 cursor-pointer w-fit'>
                    <ArrowBigLeft fill='' /> Volver
                </div>}
                <ProgressBar totalSteps={isSolucionador ? 6 : 5} currentStep={currentStep} />
                <div className='max-w-sm w-full md:w-96 mx-auto flex flex-col'>
                    {currentStep === 0 && <FirstForm />}
                    {currentStep === 1 && <DynamicSecondStep />}
                    {currentStep === 2 && <DynamictThirdStep />}
                    {currentStep === 3 && <DynamicFourthStep />}
                    {currentStep === 4 && <DynamicFifthStep />}
                    {!isSolucionador ? currentStep === 5 && <Confetti /> : currentStep === 5 && <DynamicSixthStep />  }
                    {currentStep === 6 && <Confetti />}
                </div>
            </div>
        </>
    )
}
