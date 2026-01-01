import type React from "react"
import Link from "next/link"

type ColorType = "primary" | "accent" | "accent2" | "accent3" | "accent4"

interface CardNavegacionProps {
  href: string
  titulo: string
  descripcion: string
  color: ColorType
}

const colorBgMap: Record<ColorType, string> = {
  primary: "bg-primary-lighter border-primary/20",
  accent: "bg-accent-lighter border-accent/20",
  accent2: "bg-accent2-lighter border-accent2/20",
  accent3: "bg-accent3-lighter border-accent3/20",
  accent4: "bg-accent4-lighter border-accent4/20",
}

const colorCSSMap: Record<ColorType, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  accent2: "var(--accent2)",
  accent3: "var(--accent3)",
  accent4: "var(--accent4)",
}

export function CardNavegacion({ href, titulo, descripcion, color }: CardNavegacionProps) {
  return (
    <Link href={href}>
      <div className="h-full group cursor-pointer">
        <div
          className={`flex flex-col h-full rounded-xl border-2 transition-all duration-300 p-7 ${colorBgMap[color]} hover:border-primary/40 hover:shadow-lg hover:scale-105`}
        >
          <h3
            className="text-xl font-bold text-foreground mb-3 group-hover:transition-colors"
            style={
              {
                "--hover-color": colorCSSMap[color],
              } as React.CSSProperties & { "--hover-color": string }
            }
          >
            {titulo}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed flex-grow mb-5">{descripcion}</p>

          <div
            className="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
            style={{ color: colorCSSMap[color] }}
          >
            <span className="inline-block group-hover:translate-x-1 transition-transform">Explorar →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
