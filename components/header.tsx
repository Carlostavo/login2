"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LoginModal } from "@/components/auth/LoginModal"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/metas", label: "Metas" },
  { href: "/indicadores", label: "Indicadores" },
  { href: "/avances", label: "Avances" },
  { href: "/reportes", label: "Reportes" },
  { href: "/formularios", label: "Formularios" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()

  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      setUserRole(profile?.role)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

            {/* Botón de Usuario */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {userRole ? `Cuenta (${userRole})` : "Iniciar Sesión"}
            </button>
          </div>

          {/* Menú Mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-secondary-bg transition-colors"
              aria-label="User menu"
            >
              <User size={20} />
            </button>
            <button
              className="md:hidden p-2 rounded-md hover:bg-secondary-bg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsLoginModalOpen(true)
                }}
                className="w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
