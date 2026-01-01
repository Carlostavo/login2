"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CardNavegacion } from "@/components/card-navegacion"
import { getUser } from "@/lib/auth/actions"

export default async function Home() {
  const user = await getUser()

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header user={user} />

      <main className="flex-grow w-full">
        {/* Hero Section Profesional */}
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
                Plataforma Oficial de Gestión Ambiental
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
                Residuos Sólidos del Cantón Daule
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 text-balance leading-relaxed">
                Accede a información transparente y datos actualizados sobre la gestión de residuos sólidos. Participa
                en encuestas, consulta indicadores y conoce nuestros avances ambientales.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de Tarjetas Mejorada */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <div className="mb-12 sm:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-3">
                SECCIONES PRINCIPALES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explora nuestras secciones
              </h2>
              <p className="text-foreground/60 max-w-2xl text-base sm:text-lg">
                Accede a información detallada, indicadores ambientales, reportes técnicos y participa en nuestras
                encuestas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <CardNavegacion
                href="/metas"
                titulo="Metas"
                descripcion="Objetivos y compromisos ambientales establecidos por el cantón para mejorar la gestión de residuos."
                color="primary"
              />
              <CardNavegacion
                href="/indicadores"
                titulo="Indicadores"
                descripcion="Datos en tiempo real y gráficos analíticos sobre caracterización de desechos y comportamiento sostenible."
                color="accent"
              />
              <CardNavegacion
                href="/avances"
                titulo="Avances"
                descripcion="Seguimiento del progreso y resultados en la implementación de nuestros programas ambientales."
                color="accent2"
              />
              <CardNavegacion
                href="/reportes"
                titulo="Reportes"
                descripcion="Documentos técnicos, estudios detallados y reportes completos sobre residuos sólidos del cantón."
                color="accent4"
              />
              <CardNavegacion
                href="/formularios"
                titulo="Formularios"
                descripcion="Participa directamente en nuestras encuestas y aporta datos valiosos para mejorar políticas."
                color="accent3"
              />
            </div>
          </div>
        </section>

        {/* Sección Informativa Profesional */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-secondary-bg border-y border-border">
          <div className="container-safe">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-lighter text-primary font-medium text-xs mb-6">
              SOBRE ESTE PROYECTO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-12">
              Compromiso ambiental
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="card-elevated p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Nuestra Visión</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  El GAD Cantón Daule se compromete con la sostenibilidad ambiental y la gestión responsable de residuos
                  sólidos. Esta plataforma refleja nuestro esfuerzo por transparencia, participación ciudadana y mejora
                  continua en políticas ambientales.
                </p>
              </div>
              <div className="card-elevated p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">¿Cómo Participar?</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Tu participación es fundamental. Completa nuestras encuestas para ayudarnos a entender mejor las
                  características de los desechos sólidos y el comportamiento proambiental de nuestra comunidad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
