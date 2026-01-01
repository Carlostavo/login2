import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AvancesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
              SEGUIMIENTO Y PROGRESO
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Avances
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Seguimiento del progreso en la implementación de programas ambientales y cumplimiento de metas del cantón.
            </p>
          </div>
        </section>

        {/* Contenido placeholder con estructura profesional */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-6">
              INFORMACIÓN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-text mb-6 sm:mb-8">
              Reportes de avances
            </h2>
            <div className="card-elevated p-6 sm:p-8 md:p-12">
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                Aquí encontrarás información detallada sobre los avances en la implementación de programas ambientales y
                el cumplimiento de metas. Los datos se actualizan regularmente.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
