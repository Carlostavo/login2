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

  // Verificar que el correo existe en la base de datos
  const { data: profile } = await supabase.from("user_profiles").select("email").eq("email", email).single()

  if (!profile) {
    return {
      success: false,
      error: "No existe una cuenta registrada con este correo electrónico",
    }
  }

  const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
    ? `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL}/auth/reset-password`
    : `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    message: "Se ha enviado un correo de recuperación a tu cuenta. Revisa tu bandeja de entrada y spam.",
  }
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
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    try {
      const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()
      return { ...user, profile }
    } catch (profileError) {
      console.error("[v0] Error al obtener perfil (posible problema RLS):", profileError)
      return { ...user, profile: null }
    }
  } catch (error) {
    console.error("[v0] Error en getUser:", error)
    return null
  }
}

export async function createUser(email: string, password: string, fullName: string, role: "admin" | "tecnico") {
  try {
    const supabase = await createClient()

    const currentUser = await getUser()
    if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
      return { success: false, error: "No tienes permisos para crear usuarios" }
    }

    // Verificar si el email ya está registrado
    const { data: existingUser } = await supabase.from("user_profiles").select("email").eq("email", email).single()

    if (existingUser) {
      return { success: false, error: "Ya existe un usuario con este correo electrónico" }
    }

    // Crear usuario con confirmación automática
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: role,
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

    // Enviar correo de invitación para configurar contraseña
    const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
      ? `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL}/auth/reset-password?invited=true`
      : `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password?invited=true`

    const { error: inviteError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (inviteError) {
      console.error("[v0] Error al enviar correo de invitación:", inviteError)
    }

    revalidatePath("/admin/usuarios")
    return {
      success: true,
      message: "Usuario creado exitosamente. Se ha enviado un correo de invitación para configurar la contraseña.",
    }
  } catch (error: any) {
    console.error("[v0] Error en createUser:", error)
    return { success: false, error: error.message || "Error al crear usuario" }
  }
}

export async function getAllUsers() {
  try {
    const supabase = await createClient()

    const currentUser = await getUser()
    if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
      return { success: false, error: "No tienes permisos para ver usuarios", users: [] }
    }

    const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

    if (error) {
      return { success: false, error: error.message, users: [] }
    }

    return { success: true, users: data }
  } catch (error: any) {
    console.error("[v0] Error en getAllUsers:", error)
    return { success: false, error: error.message || "Error al obtener usuarios", users: [] }
  }
}

export async function deleteUser(userId: string) {
  try {
    const supabase = await createClient()

    const currentUser = await getUser()
    if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
      return { success: false, error: "No tienes permisos para eliminar usuarios" }
    }

    if (currentUser.id === userId) {
      return { success: false, error: "No puedes eliminarte a ti mismo" }
    }

    // Eliminar de auth.users (cascade eliminará de user_profiles)
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)

    if (authError) {
      return { success: false, error: authError.message }
    }

    revalidatePath("/admin/usuarios")
    return { success: true, message: "Usuario eliminado exitosamente" }
  } catch (error: any) {
    console.error("[v0] Error en deleteUser:", error)
    return { success: false, error: error.message || "Error al eliminar usuario" }
  }
}

export async function updateUser(userId: string, fullName: string, role: "admin" | "tecnico") {
  try {
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
  } catch (error: any) {
    console.error("[v0] Error en updateUser:", error)
    return { success: false, error: error.message || "Error al actualizar usuario" }
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    const supabase = await createClient()

    const currentUser = await getUser()
    if (!currentUser?.profile?.role || currentUser.profile.role !== "admin") {
      return { success: false, error: "No tienes permisos para enviar correos" }
    }

    const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
      ? `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL}/auth/reset-password`
      : `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: "Correo de recuperación enviado exitosamente. El usuario recibirá las instrucciones en su bandeja.",
    }
  } catch (error: any) {
    console.error("[v0] Error en sendPasswordResetEmail:", error)
    return { success: false, error: error.message || "Error al enviar correo" }
  }
}
