'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    avatar: 'SJ',
    rating: 5,
    content: 'Working with the_arijit_187 was an absolute pleasure. They delivered a stunning website that exceeded our expectations. The attention to detail and communication throughout the project was exceptional.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, DataFlow',
    avatar: 'MC',
    rating: 5,
    content: 'Incredible work! The dashboard they built for us is not only beautiful but also highly functional. Our team productivity has increased significantly. Highly recommended!',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director, GrowthCo',
    avatar: 'ER',
    rating: 5,
    content: 'The landing page design was exactly what we needed. Conversion rates improved by 40% after the redesign. Professional, creative, and a joy to work with.',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CTO, InnovateLabs',
    avatar: 'DK',
    rating: 5,
    content: 'Exceptional frontend skills combined with great design sense. The code quality was top-notch and the project was delivered ahead of schedule. Will definitely work together again!',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Product Manager, AppWorks',
    avatar: 'LT',
    rating: 5,
    content: 'They transformed our outdated app into a modern, user-friendly platform. The animations and micro-interactions they added really make our product stand out.',
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-balance sm:text-5xl"
          >
            What Clients <span className="gradient-text">Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-pretty"
          >
            Don&apos;t just take my word for it. Here&apos;s what some of my 
            clients have to say about working with me.
          </motion.p>
        </div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute -top-4 left-8 rounded-full bg-primary/20 p-3">
              <Quote className="h-6 w-6 text-primary" />
            </div>

            {/* Content */}
            <div className="relative">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Rating */}
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-8 text-lg text-foreground md:text-xl text-pretty leading-relaxed">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-lg font-bold text-primary-foreground">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Client logos placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-sm text-muted-foreground uppercase tracking-wider">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {['TechStart', 'DataFlow', 'GrowthCo', 'InnovateLabs', 'AppWorks'].map((company) => (
              <span key={company} className="text-xl font-bold text-muted-foreground">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
