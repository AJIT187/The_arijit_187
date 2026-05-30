'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Zap, Coffee } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '5+', icon: Code2 },
  { label: 'Projects Completed', value: '50+', icon: Palette },
  { label: 'Happy Clients', value: '30+', icon: Zap },
  { label: 'Cups of Coffee', value: '999+', icon: Coffee },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container relative mx-auto px-6">
        <div ref={ref} className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              {/* Decorative elements */}
              <div className="absolute inset-0 glass-card" />
              <div className="absolute inset-0 grid-pattern opacity-30" />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl border border-primary/20 p-1">
                <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              </div>

              {/* Content */}
              <div className="relative flex h-full flex-col items-center justify-center p-8">
                <motion.div
                  className="text-9xl font-bold gradient-text"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  A
                </motion.div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Passionate about creating beautiful, functional digital experiences
                </p>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -right-4 top-8 rounded-xl glass-card px-4 py-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-sm font-medium">React Expert</span>
              </motion.div>
              <motion.div
                className="absolute -left-4 bottom-24 rounded-xl glass-card px-4 py-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-sm font-medium">UI/UX Designer</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Section label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-4 text-sm font-medium uppercase tracking-wider text-primary"
            >
              About Me
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mb-6 text-4xl font-bold leading-tight text-balance sm:text-5xl"
            >
              Turning Vision Into{' '}
              <span className="gradient-text">Digital Reality</span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4 text-muted-foreground"
            >
              <p className="text-pretty">
                Hey there! I&apos;m <span className="text-foreground font-medium">the_arijit_187</span>, 
                a passionate frontend developer and UI/UX designer with over 5 years of experience 
                crafting exceptional digital experiences.
              </p>
              <p className="text-pretty">
                I specialize in building modern, responsive web applications using cutting-edge 
                technologies like React, Next.js, and TypeScript. My approach combines clean code 
                architecture with stunning visual design to create products that not only work 
                flawlessly but also delight users.
              </p>
              <p className="text-pretty">
                When I&apos;m not coding, you&apos;ll find me exploring new design trends, contributing 
                to open-source projects, or enjoying a perfect cup of coffee while brainstorming 
                the next big idea.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
