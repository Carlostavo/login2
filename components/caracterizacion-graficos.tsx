"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GraficosProps {
  datos: { name: string; value: number; porcentaje: number }[]
}

const COLORS = [
  { bg: "rgba(255, 99, 132, 0.6)", border: "rgb(255, 99, 132)" },
  { bg: "rgba(54, 162, 235, 0.6)", border: "rgb(54, 162, 235)" },
  { bg: "rgba(255, 206, 86, 0.6)", border: "rgb(255, 206, 86)" },
  { bg: "rgba(75, 192, 192, 0.6)", border: "rgb(75, 192, 192)" },
  { bg: "rgba(153, 102, 255, 0.6)", border: "rgb(153, 102, 255)" },
  { bg: "rgba(255, 159, 64, 0.6)", border: "rgb(255, 159, 64)" },
  { bg: "rgba(16, 185, 129, 0.6)", border: "rgb(16, 185, 129)" },
  { bg: "rgba(244, 63, 94, 0.6)", border: "rgb(244, 63, 94)" },
  { bg: "rgba(99, 102, 241, 0.6)", border: "rgb(99, 102, 241)" },
  { bg: "rgba(251, 191, 36, 0.6)", border: "rgb(251, 191, 36)" },
]

const SOLID_COLORS = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 206, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(16, 185, 129)",
  "rgb(244, 63, 94)",
  "rgb(99, 102, 241)",
  "rgb(251, 191, 36)",
]

const calculateYAxisWidth = (datos: any[], isMobile: boolean) => {
  if (isMobile) return 30
  const maxValue = Math.max(...datos.map((d) => d.value))
  const maxDigits = maxValue.toFixed(0).length
  return Math.max(50, maxDigits * 8 + 20)
}

export function CaracterizacionGraficos({ datos }: GraficosProps) {
  const [tipoGrafico, setTipoGrafico] = useState<"barras" | "torta" | "lineal">("barras")
  const [isMobile, setIsMobile] = useState(false)

  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  const yAxisWidth = calculateYAxisWidth(datos, isMobile)
  const barChartMargin = isMobile
    ? { top: 20, right: 5, left: 10, bottom: 80 }
    : { top: 30, right: 30, left: yAxisWidth, bottom: 100 }
  const lineChartMargin = isMobile
    ? { top: 20, right: 5, left: 15, bottom: 80 }
    : { top: 30, right: 30, left: yAxisWidth + 80, bottom: 100 }

  return (
    <Card className="p-3 sm:p-4 md:p-6 border border-border">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">
          Distribución de Desechos por Categoría
        </h3>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <Button
            onClick={() => setTipoGrafico("barras")}
            variant={tipoGrafico === "barras" ? "default" : "outline"}
            size="sm"
            className={tipoGrafico === "barras" ? "bg-primary text-white hover:bg-primary" : "text-xs sm:text-sm"}
          >
            Gráfico de Barras
          </Button>
          <Button
            onClick={() => setTipoGrafico("torta")}
            variant={tipoGrafico === "torta" ? "default" : "outline"}
            size="sm"
            className={tipoGrafico === "torta" ? "bg-primary text-white hover:bg-primary" : "text-xs sm:text-sm"}
          >
            Gráfico Circular
          </Button>
          <Button
            onClick={() => setTipoGrafico("lineal")}
            variant={tipoGrafico === "lineal" ? "default" : "outline"}
            size="sm"
            className={tipoGrafico === "lineal" ? "bg-primary text-white hover:bg-primary" : "text-xs sm:text-sm"}
          >
            Gráfico de Línea
          </Button>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        {tipoGrafico === "barras" && (
          <div className="w-full" style={{ height: isMobile ? "400px" : "500px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datos} margin={barChartMargin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={isMobile ? 100 : 120}
                  fontSize={isMobile ? 9 : 12}
                  tick={{ fill: "#4b5563" }}
                  interval={0}
                />
                <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#4b5563" }} width={yAxisWidth} />
                <Tooltip
                  formatter={(value) => `${(value as number).toFixed(2)} kg`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: isMobile ? "11px" : "14px",
                  }}
                />
                <Bar
                  dataKey="value"
                  label={(props: any) => {
                    const { x, y, width, index } = props
                    const porcentaje = datos[index]?.porcentaje ?? 0
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 8}
                        fill="#1f2937"
                        textAnchor="middle"
                        fontSize={isMobile ? 9 : 12}
                        fontWeight="bold"
                      >
                        {`${porcentaje.toFixed(1)}%`}
                      </text>
                    )
                  }}
                  radius={[6, 6, 0, 0]}
                >
                  {datos.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length].bg}
                      stroke={COLORS[index % COLORS.length].border}
                      strokeWidth={2}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tipoGrafico === "torta" && (
          <div className="w-full" style={{ height: isMobile ? "500px" : "600px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => {
                    const porcentaje = entry.porcentaje ?? 0
                    if (isMobile && porcentaje < 3) return ""
                    if (!isMobile && porcentaje < 2) return ""
                    return `${porcentaje.toFixed(1)}%`
                  }}
                  outerRadius={isMobile ? 90 : 160}
                  innerRadius={isMobile ? 45 : 80}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                  activeIndex={undefined}
                  activeShape={{
                    outerRadius: isMobile ? 95 : 170,
                    stroke: "#fff",
                    strokeWidth: 3,
                  }}
                >
                  {datos.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={SOLID_COLORS[index % SOLID_COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${(value as number).toFixed(2)} kg`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: isMobile ? "11px" : "14px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={isMobile ? 120 : 150}
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: isMobile ? "9px" : "11px",
                    maxHeight: isMobile ? "120px" : "150px",
                    overflowY: "auto",
                  }}
                  formatter={(value, entry: any) => {
                    const porcentaje = entry.payload?.porcentaje ?? 0
                    return `${value} (${porcentaje.toFixed(1)}%)`
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {tipoGrafico === "lineal" && (
          <div className="w-full" style={{ height: isMobile ? "400px" : "500px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datos} margin={lineChartMargin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={isMobile ? 100 : 120}
                  fontSize={isMobile ? 9 : 12}
                  tick={{ fill: "#4b5563" }}
                  interval={0}
                />
                <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#4b5563" }} width={yAxisWidth} />
                <Tooltip
                  formatter={(value) => `${(value as number).toFixed(2)} kg`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: isMobile ? "11px" : "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  dot={(props: any) => {
                    const { cx, cy, payload, index } = props
                    const pointColor = COLORS[index % COLORS.length]
                    return (
                      <g key={`dot-${payload.name}`}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isMobile ? 4 : 6}
                          fill={pointColor.bg}
                          stroke="white"
                          strokeWidth={2}
                        />
                        <text
                          x={cx}
                          y={cy - (isMobile ? 18 : 28)}
                          textAnchor="middle"
                          fontSize={isMobile ? 9 : 11}
                          fontWeight="600"
                          fill="#1f2937"
                        >
                          {`${payload.porcentaje.toFixed(1)}%`}
                        </text>
                      </g>
                    )
                  }}
                  strokeWidth={isMobile ? 2 : 3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  )
}
