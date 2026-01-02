import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getUser, getAllUsers } from "@/lib/auth/actions"
import { redirect } from "next/navigation"
import { UserManagementClient } from "@/components/admin/user-management-client"

export default async function UsuariosPage() {
  const user = await getUser()

  // Verificar que el usuario está autenticado y es admin
  if (!user || user.profile?.role !== "admin") {
    redirect("/")
  }

  const result = await getAllUsers()
  const users = result.success ? result.users : []

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header user={user} />

      <main className="flex-grow w-full py-8 sm:py-12 md:py-16">
        <div className="container-safe">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Gestión de Usuarios</h1>
            <p className="text-foreground/60">Administra los usuarios del sistema y sus roles</p>
          </div>

          <UserManagementClient users={users || []} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
