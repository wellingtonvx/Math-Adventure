import React, { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  color?: 'primary' | 'secondary' | 'inverse'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function Heading({
  children,
  level = 1,
  color = 'primary',
  align = 'left',
  className = '',
}: HeadingProps) {
  const Component = `h${level}` as React.ElementType

  const sizeStyles = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-semibold',
    4: 'text-xl md:text-2xl font-semibold',
    5: 'text-lg md:text-xl font-medium',
    6: 'text-base md:text-lg font-medium',
  }

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    inverse: 'text-white',
  }

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <Component
      className={`${sizeStyles[level]} ${colorStyles[color]} ${alignStyles[align]} ${className}`}
    >
      {children}
    </Component>
  )
}
