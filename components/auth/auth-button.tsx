"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import { LoginModal } from "./login-modal"
import { ForgotPasswordModal } from "./forgot-password-modal"
import { signOut } from "@/lib/auth/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface AuthButtonProps {
  user?: {
    email?: string
    profile?: {
      full_name?: string
      role?: string
    }
  } | null
}

export function AuthButton({ user }: AuthButtonProps) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{user.profile?.full_name || user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.profile?.full_name || "Usuario"}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              {user.profile?.role && (
                <p className="text-xs text-muted-foreground capitalize">Rol: {user.profile.role}</p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.profile?.role === "admin" && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/admin/usuarios">Gestionar Usuarios</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={async () => {
              await signOut()
            }}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Button onClick={() => setLoginOpen(true)} size="sm" className="gap-2">
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Iniciar Sesión</span>
      </Button>

      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onForgotPassword={() => {
          setLoginOpen(false)
          setForgotPasswordOpen(true)
        }}
      />

      <ForgotPasswordModal open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen} />
    </>
  )
}
