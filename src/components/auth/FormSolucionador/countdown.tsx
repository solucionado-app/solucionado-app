import React, { useEffect, useState } from 'react';

interface props {
    expireAt: Date
}

const CountdownTimer = ({ expireAt }: props) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(expireAt) - +new Date();
        let timeLeft = { minutes: 0, seconds: 0 };
        if (difference > 0) {
            timeLeft = {
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div>
            {timeLeft.minutes === 0 && timeLeft.seconds === 0
                ? '00:00'
                : <h1> Tiempo restante: {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</h1>
            }
        </div>
    )
}

export default CountdownTimer;