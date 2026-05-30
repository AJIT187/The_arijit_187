'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@example.com' },
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for freelance work
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="block text-balance">Crafting</span>
            <span className="gradient-text block text-balance">Digital Excellence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl"
          >
            Frontend Developer & UI/UX Designer transforming ideas into exceptional 
            digital experiences with cutting-edge technologies and pixel-perfect designs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary rounded-full px-8 text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-border/50 bg-background/50 px-8 text-lg backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/80"
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full border border-border/50 bg-background/50 p-3 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/80"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Scroll to explore</span>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
