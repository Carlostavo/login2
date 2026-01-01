import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { getUser } from "@/lib/auth/actions"
import { Toaster } from "@/components/ui/toaster"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gestión de Residuos Sólidos - Cantón Daule",
  description: "Plataforma integral para el monitoreo, reporte y gestión de residuos sólidos en el cantón Daule",
  generator: "v0.app",
  keywords: ["residuos sólidos", "gestión ambiental", "Daule", "ecología", "sostenibilidad"],
  authors: [{ name: "GAD Cantón Daule" }],
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://residuosdaule.vercel.app",
    title: "Gestión de Residuos Sólidos - Cantón Daule",
    description: "Plataforma integral para el monitoreo, reporte y gestión de residuos sólidos",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()

  return (
    <html lang="es">
      <body className={`${geist.className} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
