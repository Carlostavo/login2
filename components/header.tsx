"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { AuthButton } from "@/components/auth/auth-button"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/metas", label: "Metas" },
  { href: "/indicadores", label: "Indicadores" },
  { href: "/avances", label: "Avances" },
  { href: "/reportes", label: "Reportes" },
  { href: "/formularios", label: "Formularios" },
]

interface HeaderProps {
  user?: {
    email?: string
    profile?: {
      full_name?: string
      role?: string
    }
  } | null
}

export function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-safe h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
            <Image
              src="/images/ingenieria-20-282-29.jpeg"
              alt="Logo Ingeniería Industrial UG"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-primary tracking-tight">DAULE</span>
            <span className="text-xs text-secondary-text font-medium">Residuos Sólidos</span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-secondary-text hover:text-primary-text hover:bg-secondary-bg"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="ml-2">
            <AuthButton user={user} />
          </div>
        </div>

        {/* Menú Mobile */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-secondary-bg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menú Mobile Expandido */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-safe py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-secondary-text hover:bg-secondary-bg"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="px-4 pt-2">
              <AuthButton user={user} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
