"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { ComportamientoFiltro } from "@/components/comportamiento-filtro"
import { ComportamientoResumen } from "@/components/comportamiento-resumen"
import { ComportamientoGraficos } from "@/components/comportamiento-graficos"

export function ComportamientoContent() {
  const [datos, setDatos] = useState<any[]>([])
  const [datosFiltrados, setDatosFiltrados] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("cuestionario_comportamiento_proambiental_autosustentabilidad")
          .select("*")

        if (error) throw error
        setDatos(data || [])
        setDatosFiltrados(data || [])
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-text">Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <ComportamientoFiltro datos={datos} onFiltrar={setDatosFiltrados} />
      <ComportamientoResumen datos={datosFiltrados} />
      <ComportamientoGraficos datos={datosFiltrados} />
    </div>
  )
}
