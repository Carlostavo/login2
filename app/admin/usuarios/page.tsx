"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { UserManagement } from "@/components/admin/UserManagement"
import { Shield, Users, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    const supabase = createClient()
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push("/")
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'administrador') {
      router.push("/")
      return
    }

    setIsAdmin(true)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de Administración */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-safe py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Gestión de usuarios del sistema</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Usuarios Totales</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">--</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Administradores</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">--</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Usuarios Activos</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">--</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container-safe py-8">
        <UserManagement />
      </div>
    </div>
  )
}
