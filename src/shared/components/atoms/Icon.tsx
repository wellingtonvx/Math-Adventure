import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
}

export function Icon({
  icon: IconComponent,
  size = 'md',
  color,
  className = '',
}: IconProps) {
  const sizeStyles = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  }

  return (
    <IconComponent
      size={sizeStyles[size]}
      color={color}
      className={className}
    />
  )
}
