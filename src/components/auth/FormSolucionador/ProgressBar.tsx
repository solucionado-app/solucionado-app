import { Progress } from '@/app/ui/progress';
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
    totalSteps: number;
    currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress((currentStep / totalSteps) * 100);
    }, [currentStep, totalSteps]);

    return (
        <div className='py-2'>
            <Progress value={progress} />
        </div>
    );
};

export default ProgressBar;

