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

  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para crear usuarios" }
  }

  // Crear usuario con confirmación de correo automática
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
    },
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
    await supabase.auth.admin.deleteUser(data.user.id)
    return { success: false, error: profileError.message }
  }

  // Enviar correo de invitación con link para cambiar contraseña
  const { error: inviteError } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?invited=true`,
  })

  if (inviteError) {
    console.error("Error al enviar correo de invitación:", inviteError)
  }

  revalidatePath("/admin/usuarios")
  return { success: true, message: "Usuario creado exitosamente. Se ha enviado un correo de invitación." }
}

export async function getAllUsers() {
  const supabase = await createClient()

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

  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para eliminar usuarios" }
  }

  if (currentUser.id === userId) {
    return { success: false, error: "No puedes eliminarte a ti mismo" }
  }

  // Primero eliminar de auth.users (cascade eliminará de user_profiles)
  const { error: authError } = await supabase.auth.admin.deleteUser(userId)

  if (authError) {
    return { success: false, error: authError.message }
  }

  revalidatePath("/admin/usuarios")
  return { success: true, message: "Usuario eliminado exitosamente" }
}

export async function updateUser(userId: string, fullName: string, role: "admin" | "tecnico") {
  const supabase = await createClient()

  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para actualizar usuarios" }
  }

  const { error } = await supabase.from("user_profiles").update({ full_name: fullName, role }).eq("id", userId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/usuarios")
  return { success: true, message: "Usuario actualizado exitosamente" }
}

export async function sendPasswordResetEmail(email: string) {
  const supabase = await createClient()

  const currentUser = await getUser()
  if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
    return { success: false, error: "No tienes permisos para enviar correos" }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, message: "Correo de recuperación enviado exitosamente" }
}
