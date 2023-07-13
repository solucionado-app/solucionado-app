import Link from 'next/link'
import React from 'react'

interface Props {
    text: string
    titulo: string
}

export default function Cardhome({ text, titulo }: Props) {
    return (
        <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
        >
            <h3 className="text-2xl font-bold">{titulo + " →"}</h3>
            <div className="text-lg">
                {text}
            </div>
        </Link>
    )
}

