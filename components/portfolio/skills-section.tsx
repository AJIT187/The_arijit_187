'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    category: 'Design',
    items: [
      { name: 'Figma', level: 90 },
      { name: 'UI/UX Design', level: 88 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Design Systems', level: 85 },
      { name: 'Prototyping', level: 82 },
    ],
  },
  {
    category: 'Backend & Tools',
    items: [
      { name: 'Node.js', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Git & GitHub', level: 92 },
      { name: 'REST APIs', level: 88 },
      { name: 'Supabase', level: 85 },
    ],
  },
]

const technologies = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase',
  'Git', 'GitHub', 'VS Code', 'Figma', 'Adobe XD', 'Vercel',
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full gradient-primary"
        />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary"
          >
            My Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-balance sm:text-5xl"
          >
            Technologies I <span className="gradient-text">Master</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-pretty"
          >
            I constantly evolve my skill set to deliver cutting-edge solutions. 
            Here&apos;s a glimpse of my technical expertise.
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="mb-20 grid gap-8 lg:grid-cols-3">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="mb-6 text-lg font-semibold">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
