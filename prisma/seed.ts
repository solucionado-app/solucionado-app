const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data:
            [
                {
                    name: "Electricistas",
                    description: "¡Contrata a un ayudante eléctrico hoy!",
                    slug: "electricistas",
                    image_url: "/electricistas.jpg",
                },
                {
                    name: "Plomería",
                    description: " Un Solucionador puede proporcionar servicios de plomería para destapar, arreglar, instalar, reemplazar, reparar y más. Encuentre ayuda hoy mismo.",
                    slug: "plomeria",
                    image_url: "/plomeria.jpg",
                },
                {
                    name: "Armadores de Muebles",
                    description: "¿Necesitas a alguien para armar muebles? Contrata a un Solucionador para armar tus muebles y déjales el edificio a ellos.",
                    slug: "armadores-de-muebles",
                    image_url: "/armadores-de-muebles.jpg",
                },
                {
                    name: "Fletes",
                    description: "¡Desde el trabajo pesado hasta el desempaque y la organización, haga su movimiento con Solucionado-app",
                    slug: "fletes",
                    image_url: "/fletes.jpg",
                }
            ]
        ,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(e)
    }
    )
    .finally(async () => {
        await prisma.$disconnect();
    }
    );