"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

type UserRole = 'administrador' | 'tecnico'

interface UserFormData {
  email: string
  password: string
  name: string
  role: UserRole
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [registerData, setRegisterData] = useState<UserFormData>({
    email: "",
    password: "",
    name: "",
    role: "tecnico"
  })

  const supabase = createClient()
  const router = useRouter()

  // Verificar sesión al abrir el modal
  useEffect(() => {
    if (isOpen) {
      checkSession()
    }
  }, [isOpen])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      
      setUserRole(profile?.role)
    } else {
      setUserRole(null)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      })

      if (error) throw error

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      setUserRole(profile?.role)
      setSuccess("Inicio de sesión exitoso")
      
      // Redirigir según el rol
      if (profile?.role === 'administrador') {
        router.push('/admin/usuarios')
      } else {
        router.push('/dashboard')
      }
      
      setTimeout(() => {
        onClose()
      }, 1500)

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Verificar si el usuario actual es administrador
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error("No tienes permisos para crear usuarios")
      }

      const { data: currentUser } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (currentUser?.role !== 'administrador') {
        throw new Error("Solo los administradores pueden crear usuarios")
      }

      // Crear usuario en Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: registerData.email,
        password: registerData.password,
        email_confirm: true
      })

      if (authError) throw authError

      // Crear perfil en la base de datos
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: registerData.email,
          name: registerData.name,
          role: registerData.role,
          created_by: session.user.id
        })

      if (profileError) throw profileError

      setSuccess("Usuario creado exitosamente")
      setRegisterData({
        email: "",
        password: "",
        name: "",
        role: "tecnico"
      })

    } catch (err: any) {
      setError(err.message || "Error al crear usuario")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserRole(null)
    router.refresh()
  }

  const handleResetPassword = async () => {
    if (!loginData.email) {
      setError("Por favor ingresa tu correo electrónico")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(loginData.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
      setSuccess("Se ha enviado un enlace de recuperación a tu correo")

    } catch (err: any) {
      setError(err.message || "Error al enviar el correo de recuperación")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {userRole ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Sesión Activa</h2>
              <p className="mt-2 text-gray-600">
                Has iniciado sesión como <span className="font-semibold capitalize">{userRole}</span>
              </p>
            </div>
            
            <div className="space-y-4">
              {userRole === 'administrador' && (
                <Link
                  href="/admin/usuarios"
                  onClick={onClose}
                  className="block w-full py-3 px-4 bg-primary text-white text-center rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Gestionar Usuarios
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? "Iniciar Sesión" : "Crear Nuevo Usuario"}
              </h2>
              <p className="mt-2 text-gray-600">
                {isLogin 
                  ? "Ingresa tus credenciales para acceder" 
                  : "Solo administradores pueden crear usuarios"
                }
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  Iniciar Sesión
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    ¿Eres administrador? Crear nuevo usuario
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuario
                  </label>
                  <select
                    value={registerData.role}
                    onChange={(e) => setRegisterData({...registerData, role: e.target.value as UserRole})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="tecnico">Técnico</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  Crear Usuario
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Volver a Iniciar Sesión
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
