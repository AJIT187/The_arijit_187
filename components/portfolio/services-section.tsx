'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Palette, Smartphone, Globe, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building fast, scalable, and modern web applications using React, Next.js, and TypeScript.',
    features: ['Custom Web Apps', 'E-commerce Solutions', 'API Integration', 'Performance Optimization'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually stunning user interfaces that drive engagement and conversions.',
    features: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping'],
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Ensuring your website looks and works perfectly on all devices and screen sizes.',
    features: ['Mobile-First', 'Cross-Browser', 'Adaptive Layouts', 'Touch Optimization'],
  },
  {
    icon: Globe,
    title: 'Frontend Consulting',
    description: 'Expert guidance on frontend architecture, best practices, and technology choices.',
    features: ['Code Reviews', 'Architecture', 'Team Training', 'Tech Stack Selection'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speeding up your existing applications for better user experience and SEO rankings.',
    features: ['Core Web Vitals', 'Bundle Optimization', 'Caching Strategies', 'Image Optimization'],
  },
  {
    icon: Shield,
    title: 'Maintenance & Support',
    description: 'Ongoing support and maintenance to keep your applications running smoothly.',
    features: ['Bug Fixes', 'Security Updates', 'Feature Updates', '24/7 Monitoring'],
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary"
          >
            Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-balance sm:text-5xl"
          >
            What I <span className="gradient-text">Offer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-pretty"
          >
            Comprehensive frontend development and design services tailored 
            to bring your digital vision to life.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:border-primary/30"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm text-muted-foreground">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-muted-foreground">
            Have a project in mind? Let&apos;s discuss how I can help.
          </p>
          <Button
            asChild
            size="lg"
            className="gradient-primary rounded-full px-8 shadow-lg shadow-primary/25"
          >
            <Link href="#contact">Start a Project</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
