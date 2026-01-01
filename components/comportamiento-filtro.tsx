"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface FiltroProps {
  datos: any[]
  onFiltrar: (datosFiltrados: any[]) => void
}

export function ComportamientoFiltro({ datos, onFiltrar }: FiltroProps) {
  const [estadoCivil, setEstadoCivil] = useState<string>("todos")
  const [nivelEducacion, setNivelEducacion] = useState<string>("todos")
  const [situacionLaboral, setSituacionLaboral] = useState<string>("todos")
  const [ingresoMensual, setIngresoMensual] = useState<string>("todos")

  useEffect(() => {
    let resultados = [...datos]

    if (estadoCivil !== "todos") {
      resultados = resultados.filter((d) => d.estado_civil?.toLowerCase() === estadoCivil.toLowerCase())
    }
    if (nivelEducacion !== "todos") {
      resultados = resultados.filter((d) => d.educacion_jefe_hogar?.toLowerCase() === nivelEducacion.toLowerCase())
    }
    if (situacionLaboral !== "todos") {
      resultados = resultados.filter(
        (d) => d.situacion_laboral_jefe_hogar?.toLowerCase() === situacionLaboral.toLowerCase(),
      )
    }
    if (ingresoMensual !== "todos") {
      resultados = resultados.filter(
        (d) => d.ingreso_mensual_jefe_hogar?.toLowerCase() === ingresoMensual.toLowerCase(),
      )
    }

    onFiltrar(resultados)
  }, [estadoCivil, nivelEducacion, situacionLaboral, ingresoMensual, datos, onFiltrar])

  const limpiarFiltros = () => {
    setEstadoCivil("todos")
    setNivelEducacion("todos")
    setSituacionLaboral("todos")
    setIngresoMensual("todos")
  }

  const hayFiltrosActivos =
    estadoCivil !== "todos" || nivelEducacion !== "todos" || situacionLaboral !== "todos" || ingresoMensual !== "todos"

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estado Civil</label>
          <Select value={estadoCivil} onValueChange={setEstadoCivil}>
            <SelectTrigger className="bg-white border-border">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="casado">Casado</SelectItem>
              <SelectItem value="soltero">Soltero</SelectItem>
              <SelectItem value="divorciado">Divorciado</SelectItem>
              <SelectItem value="viudo">Viudo</SelectItem>
              <SelectItem value="unión libre">Unión Libre</SelectItem>
              <SelectItem value="separado">Separado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nivel de Educación</label>
          <Select value={nivelEducacion} onValueChange={setNivelEducacion}>
            <SelectTrigger className="bg-white border-border">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="primaria">Primaria</SelectItem>
              <SelectItem value="secundaria">Secundaria</SelectItem>
              <SelectItem value="universidad">Universidad</SelectItem>
              <SelectItem value="postgrado">Postgrado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Situación Laboral</label>
          <Select value={situacionLaboral} onValueChange={setSituacionLaboral}>
            <SelectTrigger className="bg-white border-border">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="empleado">Empleado</SelectItem>
              <SelectItem value="temporal">Temporal</SelectItem>
              <SelectItem value="desempleado">Desempleado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Ingreso Mensual</label>
          <Select value={ingresoMensual} onValueChange={setIngresoMensual}>
            <SelectTrigger className="bg-white border-border">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="menor al sueldo básico">Menor al sueldo básico</SelectItem>
              <SelectItem value="sueldo básico">Sueldo básico</SelectItem>
              <SelectItem value="mayor al sueldo básico">Mayor al sueldo básico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}
