import Image from 'next/image'
import solucionadorDeFondo from '../../../../public/trabajadoroficio.png'
import solucionadorDeFondosm from '../../../../public/trabajador-oficio-sm.png'

export default function Background() {
    return (
        <>
            <Image
                alt="solucionadorDeFondo"
                src={solucionadorDeFondo}
                placeholder="blur"
                className='hidden md:block'

                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
            <Image
                alt="solucionadorDeFondo"
                src={solucionadorDeFondosm}
                placeholder="blur"
                quality={100}
                className='md:hidden'
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
        </>

    )
}