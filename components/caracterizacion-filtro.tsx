"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import type { CaracterizacionRecord } from "@/lib/utils/caracterizacion-data"

interface CaracterizacionFiltroProps {
  registros: CaracterizacionRecord[]
  onFiltroChange: (registrosFiltrados: CaracterizacionRecord[]) => void
}

export function CaracterizacionFiltro({ registros, onFiltroChange }: CaracterizacionFiltroProps) {
  const [lugares, setLugares] = useState<string[]>([])
  const [lugarSeleccionado, setLugarSeleccionado] = useState<string>("todos")

  useEffect(() => {
    const lugaresUnicos = Array.from(new Set(registros.map((r) => r.lugar))).sort()
    setLugares(lugaresUnicos)
  }, [registros])

  useEffect(() => {
    if (lugarSeleccionado === "todos") {
      onFiltroChange(registros)
    } else {
      onFiltroChange(registros.filter((r) => r.lugar === lugarSeleccionado))
    }
  }, [lugarSeleccionado, registros, onFiltroChange])

  const limpiarFiltros = () => {
    setLugarSeleccionado("todos")
  }

  const hayFiltrosActivos = lugarSeleccionado !== "todos"

  return (
    <Card className="p-6 border border-border bg-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Filtros</h3>
        {hayFiltrosActivos && (
          <Button
            onClick={limpiarFiltros}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar Filtros
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Ubicación</label>
        <Select value={lugarSeleccionado} onValueChange={setLugarSeleccionado}>
          <SelectTrigger className="bg-white border-border">
            <SelectValue placeholder="Seleccionar ubicación" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="todos">Todas las ubicaciones</SelectItem>
            {lugares.map((lugar) => {
              const count = registros.filter((r) => r.lugar === lugar).length
              return (
                <SelectItem key={lugar} value={lugar}>
                  {lugar} ({count} registros)
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
