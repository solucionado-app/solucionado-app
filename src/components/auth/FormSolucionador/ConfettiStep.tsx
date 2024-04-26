import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { confetti } from '@tsparticles/confetti';
import { SendWhatsapp } from '@/src/server/whatsapp';
import { localRegisterSolucionador, type RegisterSolucionadorFormValues } from '@/src/lib/localStorage';
import { useFormSteps } from './ContextSolucionadorForm';
import { Button } from '../../ui/button';
import { useUser } from '@clerk/nextjs';

export const confettiAni = () => {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: unknown) {
        return confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    return Promise.all([
        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        }),
        fire(0.2, {
            spread: 60,
        }),
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        }),
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        }),
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        }),
    ]);
}

export const ConfettiAnimation: React.FC = () => {


    useEffect(() => {
        confettiAni().then(() => {
            // Do something after the confetti animation
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <> </>
    );
};
const Confetti: React.FC = () => {
    const router = useRouter();
    const path = usePathname();
    const { user } = useUser();
    const unsafeMetadata = user?.unsafeMetadata;
    const isSolucionador = unsafeMetadata?.role === 'SOLUCIONADOR';
    const { setOpen } = useFormSteps();
    const handleButtonClick = () => {
        console.log('path', path);
        if (path === '/registro/solucionador/completar-perfil') {
            void router.push('/');
        } else {
            setOpen && setOpen(false);
        }
    }

    useEffect(() => {
        const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
        if (!!local.phone && !local.messageSent) {
            confettiAni().then(() => {
                // Do something after the confetti animation
                if (!!local.phone && !local.messageSent) {
                    console.log('sending message');
                    SendWhatsapp({
                        body: "¡Bienvenido a Solucionado! Conecta con clientes de toda Argentina y comienza a ofrecer tus servicios hoy.", to: `whatsapp:${local.phone}`
                    }).then((res) => {
                        console.log('res', res);
                        const newLocal: RegisterSolucionadorFormValues = {
                            ...local,
                            messageSent: 'true'
                        }
                        localRegisterSolucionador.set(newLocal)
                    }
                    ).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }

    }, []);

    return (
        <div className="confetti">
            <div className='flex flex-col justify-center text-center'>
                <h1 className='text-2xl font-bold'>¡Listo!</h1>
                {isSolucionador ? <p className='text-gray-500'>Ya podes empezar a recibir solicitudes de trabajo</p>
                    :
                    <p className='text-gray-500'>Ya podes empezar a solicitar servicios</p>}
                <Button onClick={handleButtonClick} className='mt-5'>Continuar</Button>
            </div>
        </div>
    );
};

export default Confetti;