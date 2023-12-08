import React from 'react'


interface Props {
    status: "PENDING" | "ACEPTED" | "REJECTED" | "FINISHED" | "CANCELED" | undefined
}

export default function StatusTranslate({ status }: Props) {
    return (
        status === 'PENDING' && <div className="text-md text-solYellow font-semibold">
            {'Pendiente'}
        </div>
        ||
        status === 'ACEPTED' && <div className="text-md text-green-500 font-semibold">
            {'Aceptado'}
        </div>

    )
}
