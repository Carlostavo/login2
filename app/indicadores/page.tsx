import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function IndicadoresPage() {
  const encuestas = [
    {
      slug: "caracterizacion",
      titulo: "Caracterización de Desechos Sólidos",
      descripcion:
        "Datos analíticos sobre la composición y cantidad de desechos generados en los hogares del cantón Daule",
      color: "primary",
    },
    {
      slug: "autosustentabilidad",
      titulo: "Autosustentabilidad y Comportamiento Proambiental",
      descripcion:
        "Información sobre factores que inciden en el comportamiento proambiental y sustentable de la comunidad",
      color: "accent",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
              DATOS Y ANÁLISIS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Indicadores
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Datos en tiempo real, gráficos analíticos y métricas detalladas sobre sostenibilidad ambiental del cantón.
            </p>
          </div>
        </section>

        {/* Tarjetas de indicadores mejoradas */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <div className="mb-12 sm:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-3">
                SECCIONES DE INDICADORES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-text mb-4">
                Datos y gráficos disponibles
              </h2>
              <p className="text-secondary-text max-w-2xl text-base sm:text-lg">
                Explora nuestras encuestas principales con análisis detallados, visualización de datos y indicadores de
                sostenibilidad ambiental.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {encuestas.map((encuesta) => (
                <Link key={encuesta.slug} href={`/indicadores/${encuesta.slug}`}>
                  <div className="group cursor-pointer h-full">
                    <div
                      className={`flex flex-col h-full rounded-xl border-2 transition-all duration-300 p-6 sm:p-8 ${
                        encuesta.color === "primary"
                          ? "border-primary/20 bg-primary-lighter hover:border-primary/40"
                          : "border-accent/20 bg-accent-lighter hover:border-accent/40"
                      } hover:shadow-lg`}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            encuesta.color === "primary" ? "bg-primary" : "bg-accent"
                          }`}
                        ></div>
                        <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                          Indicador
                        </span>
                      </div>

                      <h3
                        className={`text-lg sm:text-xl font-bold text-primary-text mb-3 group-hover:transition-colors ${
                          encuesta.color === "primary" ? "group-hover:text-primary" : "group-hover:text-accent"
                        }`}
                      >
                        {encuesta.titulo}
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed flex-grow mb-5">
                        {encuesta.descripcion}
                      </p>

                      <div
                        className={`flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all ${
                          encuesta.color === "primary" ? "text-primary" : "text-accent"
                        }`}
                      >
                        <span>Ver datos y gráficos</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
