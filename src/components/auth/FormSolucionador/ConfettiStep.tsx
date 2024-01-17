import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './Conffeti.css';
import { ParticlesContainer } from './Particles';
const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

const ConfettiPiece: React.FC = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;

    return (
        <div className="confetti-piece" style={{ left: `${left}%`, animationDuration: `${animationDuration}s`, backgroundColor: color }} />
    );
};
const Confetti: React.FC = () => {
    const [confetti, setConfetti] = useState(false);
    const router = useRouter();
    const handleButtonClick = () => {
        setConfetti(true);
        router.push('/');
    };

    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 20,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: '10px',
        height: '10px',
        perspective: '500px',
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
    };
    const pieces = 70;

    return (
        <div className="confetti">
            <div className='flex flex-col justify-center text-center'>
                <h1 className='text-2xl font-bold'>¡Listo!</h1>
                <p className='text-gray-500'>Ya podes empezar a recibir solicitudes de trabajo</p>
                <Button onClick={() => void router.push('/')} className='mt-5'>Ir al inicio</Button>
            </div>
            {/* {Array.from({ length: pieces }).map((_, i) => (
                <ConfettiPiece key={i} />
            ))} */}
            <ParticlesContainer />
        </div>
    );
};

export default Confetti;