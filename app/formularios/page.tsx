import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CardEncuesta } from "@/components/card-encuesta"
import { Info, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react"

export default function FormulariosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="flex-grow w-full">
        {/* Hero Section Profesional */}
        <section className="gradient-eco text-white py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container-safe relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium mb-4">
              ENCUESTAS Y PARTICIPACIÓN
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Encuestas y Formularios
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl text-balance leading-relaxed">
              Tu participación es fundamental para mejorar la gestión de residuos sólidos en el cantón. Completa
              nuestras encuestas y aporta información valiosa para diseñar soluciones efectivas.
            </p>
          </div>
        </section>

        {/* Instrucciones de uso */}
        <section className="py-12 sm:py-16 md:py-20 bg-primary-lighter/10 border-b border-border">
          <div className="container-safe">
            <div className="flex items-start gap-3 mb-6 sm:mb-8">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Cómo usar las encuestas
                </h2>
                <p className="text-foreground/60 text-base sm:text-lg">
                  Nuestras encuestas están alojadas en Tally, una plataforma segura y fácil de usar. Sigue estas
                  instrucciones para completar tu participación.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-lighter flex items-center justify-center mb-4">
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base sm:text-lg">Puedes retroceder</h3>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  Durante la encuesta, puedes retroceder a preguntas anteriores para revisar o modificar tus respuestas
                  antes de finalizar. No te preocupes si necesitas corregir algo.
                </p>
              </div>

              <div className="bg-white dark:bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-lighter flex items-center justify-center mb-4">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base sm:text-lg">Responde múltiples veces</h3>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  Una vez finalizada la encuesta, puedes recargar la página del enlace para llenar una nueva encuesta.
                  Esto es útil si deseas proporcionar información adicional o de otro hogar.
                </p>
              </div>

              <div className="bg-white dark:bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent3-lighter flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent3" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base sm:text-lg">Seguro y confidencial</h3>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  Todas las encuestas están alojadas en Tally, una plataforma segura que protege tu información. Tus
                  respuestas son confidenciales y se utilizarán únicamente con fines de investigación.
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-accent-lighter/20 border border-accent-lighter rounded-lg">
              <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                <strong className="text-foreground">Nota:</strong> Las encuestas están optimizadas para funcionar en
                cualquier dispositivo. Te recomendamos completarlas en un ambiente tranquilo donde puedas concentrarte y
                proporcionar información precisa.
              </p>
            </div>
          </div>
        </section>

        {/* Encuestas */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
          <div className="container-safe">
            <div className="mb-12 sm:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent-lighter text-accent font-medium text-xs mb-3">
                FORMULARIOS DISPONIBLES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Encuestas disponibles</h2>
              <p className="text-foreground/60 max-w-3xl text-base sm:text-lg">
                Selecciona una encuesta para participar. Tu información nos ayudará a entender mejor las características
                de los desechos y los comportamientos proambientales de nuestra comunidad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <CardEncuesta
                numero={1}
                titulo="Encuesta de autosustentabilidad y comportamiento proambiental"
                objetivo="Recopilar información acerca de los factores que inciden en el comportamiento proambiental y la autosustentabilidad en el manejo de los desechos sólidos domiciliarios en el Cantón Daule"
                enlace="https://tally.so/r/nrNo9M"
                color="accent"
              />
              <CardEncuesta
                numero={2}
                titulo="Caracterización de los desechos sólidos en la comunidad de Daule"
                objetivo="Caracterizar los desechos sólidos que se generan en los hogares del cantón Daule"
                enlace="https://tally.so/r/3jd0da"
                color="primary"
              />
            </div>
          </div>
        </section>

        {/* Información adicional */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-secondary-bg border-y border-border">
          <div className="container-safe">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-lighter text-primary font-medium text-xs mb-6">
              IMPORTANCIA DE TU PARTICIPACIÓN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-12">
              ¿Por qué es importante tu respuesta?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="card-elevated p-6 sm:p-8">
                <div className="w-3 h-3 rounded-full bg-primary mb-4"></div>
                <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Información confiable</h3>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  Los datos que recopilas ayudan a crear una base de información sólida para la toma de decisiones
                  basadas en evidencia.
                </p>
              </div>
              <div className="card-elevated p-6 sm:p-8">
                <div className="w-3 h-3 rounded-full bg-accent mb-4"></div>
                <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Mejora continua</h3>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  Tu retroalimentación nos permite identificar áreas de mejora y diseñar programas y políticas más
                  efectivas.
                </p>
              </div>
              <div className="card-elevated p-6 sm:p-8">
                <div className="w-3 h-3 rounded-full bg-accent3 mb-4"></div>
                <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Participación ciudadana</h3>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                  Tu voz importa. Sé parte de la solución para un cantón más sostenible, limpio y responsable.
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
