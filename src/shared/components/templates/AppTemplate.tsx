'use client'

import { ReactNode } from 'react'

interface AppTemplateProps {
  children: ReactNode
}

export function AppTemplate({ children }: AppTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {children}
      </div>
    </div>
  )
}
