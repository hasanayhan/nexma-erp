import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
})

export const metadata: Metadata = {
  title: "İşletme Yönetim Sistemi - ERP",
  description: "Kapsamlı işletme yönetim sistemi - Stok, Cari, Fatura ve E-ticaret yönetimi",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${quicksand.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
