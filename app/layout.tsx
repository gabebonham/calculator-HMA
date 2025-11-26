import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const mont = Montserrat({ weight: '500', variable: '--font-mont' })

export const metadata: Metadata = {
  title: 'Calculator HMA',
  description: 'Calculator HMA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${mont.className} antialiased `}>
        <main className="">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
