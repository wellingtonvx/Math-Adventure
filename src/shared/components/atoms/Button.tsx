'use client'

import { ReactNode, MouseEvent } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-xl transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-200',
    secondary:
      'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-200',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-200',
    warning:
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-200',
    error: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-200',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[44px]',
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  )
}
