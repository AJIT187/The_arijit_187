'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in modern frontend technologies including React, Next.js, TypeScript, and Tailwind CSS. I also have experience with backend technologies like Node.js, PostgreSQL, and Supabase for full-stack development.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary depending on scope and complexity. A simple landing page might take 1-2 weeks, while a complex web application could take 2-3 months. I always provide detailed estimates after understanding your requirements.',
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes! I offer various maintenance packages to keep your application running smoothly. This includes bug fixes, security updates, performance optimization, and feature additions as needed.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'I believe in transparent communication. We&apos;ll have regular check-ins via your preferred method (Slack, Discord, email, or video calls). You&apos;ll also have access to project management tools to track progress in real-time.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'I offer both fixed-price and hourly rate options depending on the project type. Fixed pricing works best for well-defined projects, while hourly rates are suitable for ongoing work or projects with evolving requirements.',
  },
  {
    question: 'Can you work with my existing team?',
    answer: 'Absolutely! I have experience collaborating with in-house teams, other freelancers, and agencies. I adapt to your existing workflows, tools, and code standards to ensure seamless integration.',
  },
  {
    question: 'Do you provide design services as well?',
    answer: 'Yes, I offer UI/UX design services including wireframing, prototyping, and visual design. I can work from your existing designs or create new ones from scratch based on your requirements.',
  },
  {
    question: 'What is your revision policy?',
    answer: 'I include a reasonable number of revisions in all my projects to ensure you&apos;re completely satisfied with the result. The exact number depends on the project scope and is clearly outlined in our agreement.',
  },
]

function FAQItem({ faq, index, isOpen, onToggle }: { 
  faq: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="border-b border-border/50"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
      >
        <span className="pr-4 font-medium">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground text-pretty">{faq.answer}</p>
      </motion.div>
    </motion.div>
  )
}

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-32">
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
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-balance sm:text-5xl"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-pretty"
          >
            Got questions? I&apos;ve got answers. Here are some of the most 
            common questions I receive from potential clients.
          </motion.p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
