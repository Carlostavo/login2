"use client"

import { Card } from "@/components/ui/card"

interface ResumenProps {
  datos: any[]
}

export function ComportamientoResumen({ datos }: ResumenProps) {
  const totalEncuestas = datos.length

  const tipoHogarCounts = datos.reduce((acc: Record<string, number>, d) => {
    const tipo = (d.tipo_hogar || "No especificado").toLowerCase()
    acc[tipo] = (acc[tipo] || 0) + 1
    return acc
  }, {})

  const tipoHogarPredominante = Object.entries(tipoHogarCounts).sort((a, b) => b[1] - a[1])[0] || ["No disponible", 0]
  const tipoHogarPorcentaje = totalEncuestas > 0 ? ((tipoHogarPredominante[1] as number) / totalEncuestas) * 100 : 0

  const educacionCounts = datos.reduce((acc: Record<string, number>, d) => {
    const edu = (d.educacion_jefe_hogar || "No especificado").toLowerCase()
    acc[edu] = (acc[edu] || 0) + 1
    return acc
  }, {})
  const educacionPredominante = Object.entries(educacionCounts).sort((a, b) => b[1] - a[1])[0] || ["No disponible", 0]
  const educacionPorcentaje = totalEncuestas > 0 ? ((educacionPredominante[1] as number) / totalEncuestas) * 100 : 0

  const situacionCounts = datos.reduce((acc: Record<string, number>, d) => {
    const sit = (d.situacion_laboral_jefe_hogar || "No especificado").toLowerCase()
    acc[sit] = (acc[sit] || 0) + 1
    return acc
  }, {})
  const situacionPredominante = Object.entries(situacionCounts).sort((a, b) => b[1] - a[1])[0] || ["No disponible", 0]
  const situacionPorcentaje = totalEncuestas > 0 ? ((situacionPredominante[1] as number) / totalEncuestas) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></div>
        <div className="relative p-6 text-white">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/90">Total de Encuestas</p>
            <p className="text-4xl font-bold tracking-tight">{totalEncuestas}</p>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"></div>
        <div className="relative p-6 text-white">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/90">Tipo de Hogar Predominante</p>
            <p className="text-2xl font-bold tracking-tight capitalize">{tipoHogarPredominante[0]}</p>
            <p className="text-3xl font-bold tracking-tight">{tipoHogarPorcentaje.toFixed(2)}%</p>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700"></div>
        <div className="relative p-6 text-white">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/90">Educación Predominante</p>
            <p className="text-2xl font-bold tracking-tight capitalize">{educacionPredominante[0]}</p>
            <p className="text-3xl font-bold tracking-tight">{educacionPorcentaje.toFixed(2)}%</p>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700"></div>
        <div className="relative p-6 text-white">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/90">Situación Laboral Predominante</p>
            <p className="text-2xl font-bold tracking-tight capitalize">{situacionPredominante[0]}</p>
            <p className="text-3xl font-bold tracking-tight">{situacionPorcentaje.toFixed(2)}%</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
