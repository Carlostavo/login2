export const CATEGORIAS_DESECHOS = [
  {
    id: 1,
    nombre: "MATERIA ORGÁNICA",
    subcategorias: [
      { key: "materia_organica_jardin_kg", label: "De jardín" },
      { key: "materia_organica_cocina_kg", label: "De cocina" },
    ],
  },
  {
    id: 2,
    nombre: "GRASAS Y ACEITES",
    subcategorias: [{ key: "grasas_aceite_comestible_kg", label: "Aceite comestible" }],
  },
  {
    id: 3,
    nombre: "MEDICINA",
    subcategorias: [
      { key: "medicina_jarabe_kg", label: "Jarabe" },
      { key: "medicina_tabletas_kg", label: "Tabletas" },
    ],
  },
  {
    id: 4,
    nombre: "PAPELES Y CARTÓN",
    subcategorias: [
      { key: "papel_blanco_kg", label: "Papel Blanco" },
      { key: "papel_periodico_kg", label: "Papel periódico" },
      { key: "papel_archivo_kg", label: "Papel archivo" },
      { key: "carton_kg", label: "Cartón" },
      { key: "tetra_brik_kg", label: "Tetra-brik" },
    ],
  },
  {
    id: 5,
    nombre: "PLÁSTICOS",
    subcategorias: [
      { key: "plastico_pet_kg", label: "PET" },
      { key: "plastico_mixto_kg", label: "Plástico mixto" },
      { key: "bot_aceite_kg", label: "Bot de aceite" },
      { key: "bolsas_kg", label: "Bolsas" },
    ],
  },
  {
    id: 6,
    nombre: "VIDRIOS",
    subcategorias: [
      { key: "vidrio_blanco_kg", label: "Blanco" },
      { key: "vidrio_verde_kg", label: "Verde" },
      { key: "vidrio_otros_kg", label: "Otros" },
    ],
  },
  {
    id: 7,
    nombre: "METALES",
    subcategorias: [
      { key: "latas_ferrosas_kg", label: "Latas ferrosas" },
      { key: "aluminio_kg", label: "Aluminio" },
      { key: "acero_kg", label: "Acero" },
      { key: "metal_otros_kg", label: "Otros" },
    ],
  },
  {
    id: 8,
    nombre: "TEXTILES",
    subcategorias: [{ key: "textiles_ropa_kg", label: "Ropa, mantas, manteles, etc." }],
  },
  {
    id: 9,
    nombre: "CAUCHO",
    subcategorias: [{ key: "caucho_zapatos_neumaticos_kg", label: "Zapatos, neumáticos" }],
  },
  {
    id: 10,
    nombre: "CUERO",
    subcategorias: [{ key: "cuero_zapatos_neumaticos_kg", label: "Zapatos, carteras, etc." }],
  },
  {
    id: 11,
    nombre: "RESTO SANITARIOS",
    subcategorias: [{ key: "papel_higienico_kg", label: "Papel Higiénico" }],
  },
  {
    id: 12,
    nombre: "MADERAS",
    subcategorias: [{ key: "maderas_kg", label: "Maderas" }],
  },
  {
    id: 13,
    nombre: "BATERÍAS",
    subcategorias: [{ key: "baterias_tel_lamparas_kg", label: "De teléfono, lámparas" }],
  },
  {
    id: 14,
    nombre: "EQUIPOS ELECTRÓNICOS",
    subcategorias: [{ key: "electronicos_electrodomesticos_kg", label: "Electrodomésticos" }],
  },
  {
    id: 15,
    nombre: "ESCOMBROS",
    subcategorias: [{ key: "escombros_otros_kg", label: "Otros" }],
  },
]

export type CaracterizacionRecord = {
  id: number
  lugar: string
  fecha_registro: string | null
  materia_organica_jardin_kg: number | null
  materia_organica_cocina_kg: number | null
  grasas_aceite_comestible_kg: number | null
  medicina_jarabe_kg: number | null
  medicina_tabletas_kg: number | null
  papel_blanco_kg: number | null
  papel_periodico_kg: number | null
  papel_archivo_kg: number | null
  carton_kg: number | null
  tetra_brik_kg: number | null
  plastico_pet_kg: number | null
  plastico_mixto_kg: number | null
  bot_aceite_kg: number | null
  bolsas_kg: number | null
  vidrio_blanco_kg: number | null
  vidrio_verde_kg: number | null
  vidrio_otros_kg: number | null
  latas_ferrosas_kg: number | null
  aluminio_kg: number | null
  acero_kg: number | null
  metal_otros_kg: number | null
  textiles_ropa_kg: number | null
  caucho_zapatos_neumaticos_kg: number | null
  cuero_zapatos_neumaticos_kg: number | null
  papel_higienico_kg: number | null
  maderas_kg: number | null
  baterias_tel_lamparas_kg: number | null
  electronicos_electrodomesticos_kg: number | null
  escombros_otros_kg: number | null
}

export function calcularEstadisticas(registros: CaracterizacionRecord[]) {
  const totalEncuestas = registros.length
  const totalUbicaciones = new Set(registros.map((r) => r.lugar)).size

  let totalDesechos = 0
  registros.forEach((registro) => {
    CATEGORIAS_DESECHOS.forEach((categoria) => {
      categoria.subcategorias.forEach((sub) => {
        const valor = registro[sub.key as keyof CaracterizacionRecord]
        if (typeof valor === "number") totalDesechos += valor
      })
    })
  })

  const promedioPorEncuesta = totalEncuestas > 0 ? totalDesechos / totalEncuestas : 0

  return { totalEncuestas, totalUbicaciones, totalDesechos, promedioPorEncuesta }
}

export function calcularDatosTabla(registros: CaracterizacionRecord[]) {
  const datosTabla: {
    categoria: string
    subcategoria?: string
    peso: number
    porcentaje: number
    esTotal?: boolean
    esSubcategoria?: boolean
  }[] = []

  let totalDesechos = 0
  registros.forEach((registro) => {
    CATEGORIAS_DESECHOS.forEach((categoria) => {
      categoria.subcategorias.forEach((sub) => {
        const valor = registro[sub.key as keyof CaracterizacionRecord]
        if (typeof valor === "number") totalDesechos += valor
      })
    })
  })

  CATEGORIAS_DESECHOS.forEach((categoria) => {
    let totalCategoria = 0

    categoria.subcategorias.forEach((sub) => {
      let totalSubcategoria = 0
      registros.forEach((registro) => {
        const valor = registro[sub.key as keyof CaracterizacionRecord]
        if (typeof valor === "number") {
          totalSubcategoria += valor
          totalCategoria += valor
        }
      })

      if (totalSubcategoria > 0) {
        datosTabla.push({
          categoria: "",
          subcategoria: sub.label,
          peso: Number.parseFloat(totalSubcategoria.toFixed(2)),
          porcentaje: totalDesechos > 0 ? Number.parseFloat(((totalSubcategoria / totalDesechos) * 100).toFixed(2)) : 0,
          esSubcategoria: true,
        })
      }
    })

    if (totalCategoria > 0) {
      datosTabla.push({
        categoria: categoria.nombre,
        peso: Number.parseFloat(totalCategoria.toFixed(2)),
        porcentaje: totalDesechos > 0 ? Number.parseFloat(((totalCategoria / totalDesechos) * 100).toFixed(2)) : 0,
        esTotal: true,
      })
    }
  })

  return {
    datos: datosTabla,
    totalDesechos: Number.parseFloat(totalDesechos.toFixed(2)),
  }
}

export function calcularDatosGraficos(registros: CaracterizacionRecord[]) {
  const datosGrafico: { name: string; value: number; porcentaje: number }[] = []

  let totalDesechos = 0
  registros.forEach((registro) => {
    CATEGORIAS_DESECHOS.forEach((categoria) => {
      categoria.subcategorias.forEach((sub) => {
        const valor = registro[sub.key as keyof CaracterizacionRecord]
        if (typeof valor === "number") totalDesechos += valor
      })
    })
  })

  CATEGORIAS_DESECHOS.forEach((categoria) => {
    let totalCategoria = 0
    registros.forEach((registro) => {
      categoria.subcategorias.forEach((sub) => {
        const valor = registro[sub.key as keyof CaracterizacionRecord]
        if (typeof valor === "number") totalCategoria += valor
      })
    })

    if (totalCategoria > 0) {
      datosGrafico.push({
        name: categoria.nombre,
        value: Number.parseFloat(totalCategoria.toFixed(2)),
        porcentaje: totalDesechos > 0 ? Number.parseFloat(((totalCategoria / totalDesechos) * 100).toFixed(2)) : 0,
      })
    }
  })

  return datosGrafico.sort((a, b) => b.value - a.value)
}
