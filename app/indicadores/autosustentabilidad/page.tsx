import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ComportamientoContent } from "@/components/comportamiento-content"

export default async function AutosustentabilidadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container-safe">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-text mb-2">
              Autosustentabilidad y Comportamiento Proambiental
            </h1>
            <p className="text-secondary-text text-xs sm:text-sm md:text-base">
              Análisis de factores que inciden en el comportamiento proambiental en la gestión de desechos sólidos
              domiciliarios
            </p>
          </div>

          <ComportamientoContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
