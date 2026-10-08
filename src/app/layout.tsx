import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CelebrationProvider } from '@/shared/components/providers/CelebrationProvider'

export const metadata: Metadata = {
  title: 'Math Adventure - Aprenda Matemática Brincando',
  description:
    'Aplicação educacional gamificada para crianças aprenderem matemática de forma divertida',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CelebrationProvider>{children}</CelebrationProvider>
      </body>
    </html>
  )
}
