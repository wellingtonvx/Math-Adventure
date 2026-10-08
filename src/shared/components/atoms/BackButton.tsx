'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface BackButtonProps {
  to?: string
  label?: string
}

export function BackButton({ to, label = 'Voltar' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (to) {
      router.push(to)
    } else {
      router.back()
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-2"
    >
      <ArrowLeft size={20} />
      <span className="font-medium">{label}</span>
    </motion.button>
  )
}
