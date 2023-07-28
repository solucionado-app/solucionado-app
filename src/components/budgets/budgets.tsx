export default function Budgets() {

    return (
        <>

            <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
                {/* {user?.id !== serviceRequest?.userId && <>
                </>} */}
                {/* verificacion de que el usuario sea distinto al de la solicitud de servicio */}

                {/* {user?.id === serviceRequest?.userId &&  */}
                {/* verificacion de que el usuario sea igual al de la solicitud de servicio */}
                <div className="text-xl font-semibold border  shadow-sm relative p-5 m-5">
                    <h1 className="text-4xl font-extrabold tracking-tight">Presupuestos</h1>

                    {/* loader de presupuestos */} <p>Cargando...</p>
                    {/* verificacion de presupuestos existentes */}<p>Aun no hay presupuestos</p>{/* } */}
                    
                    {/* mapeo de presupuestos */}
                        <div className="border-t my-3 p-2">
                            <p>Precio</p>
                            <p>descripcion</p>
                            <p>fecha estimada</p>
                            <p>id de la solicitud de presupuesto</p>
                            <p>userId</p>
                            <p>presupuestoId</p>
                            
                        </div>

                </div>
            </div>

        </>
    );
}