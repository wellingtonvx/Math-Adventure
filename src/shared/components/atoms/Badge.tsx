'use client'

import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full'

  const variantStyles = {
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-purple-100 text-purple-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    neutral: 'bg-gray-100 text-gray-700',
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}
