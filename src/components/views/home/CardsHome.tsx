import React from 'react'

export default function CardsHome() {
    return (
        <div className="rounded-2xl group md:flex-[1_1_40%] lg:flex-[1_1_40%] text-2xl transition hover:bg-white/5 duration-200 hover:-translate-y-4 border border-white/10 bg-black/40 p-6 sm:p-12">
            <div>
                <h3 className="text-2xl md:text-4xl sm:mb-4 text-[#0ea5e9] font-semibold" >Expertos confiables</h3>
                <p className="text-lg opacity-80 sm:text-2xl">Contamos con una red de expertos confiables y calificados para resolver cualquier problema en tu hogar.</p>
            </div>
        </div>
    )
}
