"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Mail, UserCircle, Shield, Edit, MailCheck } from "lucide-react"
import { CreateUserModal } from "./create-user-modal"
import { EditUserModal } from "./edit-user-modal"
import { deleteUser, sendPasswordResetEmail } from "@/lib/auth/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  full_name: string | null
  role: string
  created_at: string
}

interface UserManagementClientProps {
  users: User[]
}

export function UserManagementClient({ users }: UserManagementClientProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!selectedUser) return

    const result = await deleteUser(selectedUser.id)

    if (result.success) {
      toast({
        title: "Usuario eliminado",
        description: result.message,
      })
      setDeleteDialogOpen(false)
      setSelectedUser(null)
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleSendPasswordReset = async (email: string) => {
    const result = await sendPasswordResetEmail(email)

    if (result.success) {
      toast({
        title: "Correo enviado",
        description: result.message,
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Total: {users.length} usuarios</span>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-6 transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.full_name || "Sin nombre"}</h3>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"} className="mt-1 capitalize">
                    {user.role}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedUser(user)
                  setDeleteDialogOpen(true)
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Creado: {new Date(user.created_at).toLocaleDateString("es-ES")}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedUser(user)
                  setEditModalOpen(true)
                }}
              >
                <Edit className="h-3 w-3 mr-1" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleSendPasswordReset(user.email)}
              >
                <MailCheck className="h-3 w-3 mr-1" />
                Enviar Correo
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <CreateUserModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <EditUserModal open={editModalOpen} onOpenChange={setEditModalOpen} user={selectedUser} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el usuario{" "}
              <span className="font-semibold">{selectedUser?.email}</span> del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar Usuario
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
