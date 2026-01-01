import { Card } from "@/components/ui/card"

interface CaracterizacionResumenProps {
  totalEncuestas: number
  totalUbicaciones: number
  totalDesechos: number
  promedioPorEncuesta: number
}

export function CaracterizacionResumen({
  totalEncuestas,
  totalUbicaciones,
  totalDesechos,
  promedioPorEncuesta,
}: CaracterizacionResumenProps) {
  const metricas = [
    {
      label: "Total de Encuestas",
      valor: totalEncuestas.toLocaleString(),
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total de Ubicaciones",
      valor: totalUbicaciones.toLocaleString(),
      color: "from-teal-500 to-teal-600",
    },
    {
      label: "Total de Desechos",
      valor: `${totalDesechos.toFixed(2)} kg`,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Promedio por Encuesta",
      valor: `${promedioPorEncuesta.toFixed(2)} kg`,
      color: "from-violet-500 to-violet-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricas.map((metrica) => (
        <Card
          key={metrica.label}
          className={`p-6 border-2 border-border bg-gradient-to-br ${metrica.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-white/90 mb-2">{metrica.label}</p>
            <p className="text-3xl font-bold text-white">{metrica.valor}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
