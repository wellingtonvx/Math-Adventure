import { ReactNode } from 'react'

interface TextProps {
  children: ReactNode
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'success' | 'error'
  align?: 'left' | 'center' | 'right'
  className?: string
  as?: 'p' | 'span' | 'div'
}

export function Text({
  children,
  size = 'base',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className = '',
  as: Component = 'p',
}: TextProps) {
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-400',
    inverse: 'text-white',
    success: 'text-green-600',
    error: 'text-red-600',
  }

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <Component
      className={`${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} ${alignStyles[align]} ${className}`}
    >
      {children}
    </Component>
  )
}
