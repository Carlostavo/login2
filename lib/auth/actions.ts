"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true, user: data.user }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
}

export async function resetPassword(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, message: "Se ha enviado un correo para restablecer tu contraseña" }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, message: "Contraseña actualizada exitosamente" }
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  return { ...user, profile }
}

export async function createUser(email: string, password: string, fullName: string, role: "admin" | "tecnico") {
  const supabase = await createClient()

  // Verificar que el usuario actual es admin
  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para crear usuarios" }
  }

  // Crear usuario en Supabase Auth
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // Actualizar el perfil con el nombre completo y rol
  const { error: profileError } = await supabase
    .from("user_profiles")
    .update({ full_name: fullName, role })
    .eq("id", data.user.id)

  if (profileError) {
    return { success: false, error: profileError.message }
  }

  revalidatePath("/admin/usuarios")
  return { success: true, message: "Usuario creado exitosamente" }
}

export async function getAllUsers() {
  const supabase = await createClient()

  // Verificar que el usuario actual es admin
  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para ver usuarios" }
  }

  const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, users: data }
}

export async function deleteUser(userId: string) {
  const supabase = await createClient()

  // Verificar que el usuario actual es admin
  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para eliminar usuarios" }
  }

  // No permitir que el admin se elimine a sí mismo
  if (currentUser.id === userId) {
    return { success: false, error: "No puedes eliminarte a ti mismo" }
  }

  const { error } = await supabase.auth.admin.deleteUser(userId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/usuarios")
  return { success: true, message: "Usuario eliminado exitosamente" }
}
