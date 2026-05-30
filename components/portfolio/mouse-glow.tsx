'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      animate={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.75 0.18 200 / 0.06), transparent 80%)`,
      }}
    />
  )
}
