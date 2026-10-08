export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Animações específicas para gamificação
  celebration: {
    scale: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },

  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
} as const

export type AnimationToken = typeof animations
