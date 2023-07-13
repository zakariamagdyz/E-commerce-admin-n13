import "./global.css"

import type { Metadata } from "next"

import Navbar from "@/components/Navbar"
import AuthProvider from "@/providers/auth-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { ToastProvider } from "@/providers/toast-provider"
import { inter } from "@/utils/fonts"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <ToastProvider />
            <Navbar />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
