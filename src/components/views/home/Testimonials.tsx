import Image from "next/image";

export const Testimonials = () => {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-solYellow font-semibold tracking-wide uppercase">Testimonios</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Lo que dicen nuestros clientes
          </p>
        </div>

        <div className="mt-20 max-w-lg mx-auto grid gap-10 sm:gap-6 lg:grid-cols-3 lg:max-w-none">
          <figure className="max-w-screen-md mx-auto text-center">
            <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 ">{"¡Increíble! Solucionado me sacó de apuros en un abrir y cerrar de ojos. No puedo creer lo fácil que fue. ¡Altamente recomendado"}</p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
              <div className="flex items-center divide-x-2 divide-gray-500">
                <cite className="pr-3 font-medium text-gray-900 ">Juan Pérez</cite>
                <cite className="pl-3 text-sm text-gray-500">Cliente Satisfecho</cite>
              </div>
            </figcaption>
          </figure>
          <figure className="max-w-screen-md mx-auto text-center">
            <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 ">{"¡Wow! Nunca había sido tan fácil solucionar problemas domésticos. Gracias a Solucionado, mi casa está en perfecto estado otra vez."}</p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
              <div className="flex items-center divide-x-2 divide-gray-500">
                <cite className="pr-3 font-medium text-gray-900 ">Carlos Rodríguez</cite>
                <cite className="pl-3 text-sm text-gray-500">Solucionador</cite>
              </div>
            </figcaption>
          </figure>
          <figure className="max-w-screen-md mx-auto text-center">
            <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 ">{"Me encanta la comodidad que ofrece Solucionado. Puedo solicitar ayuda desde mi sofá y recibir presupuestos en minutos. ¡Asombroso!"}</p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
              <div className="flex items-center divide-x-2 divide-gray-500">
                <cite className="pr-3 font-medium text-gray-900 ">Micheal Gough</cite>
                <cite className="pl-3 text-sm text-gray-500">CEO at Google</cite>
              </div>
            </figcaption>
          </figure>


        </div>
      </div>
    </section>
  );
};
