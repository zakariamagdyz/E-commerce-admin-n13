import "./global.css"

import { Metadata } from "next"

import AuthProvider from "@/providers/auth-provider"
import { ModalProvider } from "@/providers/modal-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { ToastProvider } from "@/providers/toast-provider"
import { InterFont } from "@/utils/fonts"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={InterFont.className}>
        <AuthProvider>
          {/* <ThemeProvider enableSystem attribute="class" defaultTheme="system"> */}
          <ThemeProvider enableSystem attribute="class" defaultTheme="light">
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
