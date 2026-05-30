'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    category: 'Web App',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard for SaaS businesses with real-time metrics, charts, and team collaboration features.',
    image: '/projects/dashboard.jpg',
    tags: ['React', 'Chart.js', 'Tailwind', 'Supabase'],
    category: 'Dashboard',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool using OpenAI API for creating marketing copy and blog posts.',
    image: '/projects/ai-tool.jpg',
    tags: ['Next.js', 'OpenAI', 'Vercel AI', 'Prisma'],
    category: 'AI/ML',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 4,
    title: 'Social Media App',
    description: 'A modern social media platform with real-time messaging, posts, and user interactions.',
    image: '/projects/social.jpg',
    tags: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    category: 'Mobile',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Portfolio Template',
    description: 'A stunning portfolio template with smooth animations and dark mode support.',
    image: '/projects/portfolio.jpg',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    category: 'Template',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'A comprehensive fitness tracking app with workout plans, progress tracking, and nutrition logging.',
    image: '/projects/fitness.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    category: 'Health',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
]

const categories = ['All', 'Web App', 'Dashboard', 'AI/ML', 'Mobile', 'Template', 'Health']

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl glass-card ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Image placeholder with gradient */}
      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20">
        <div className="flex h-full items-center justify-center">
          <span className="text-6xl font-bold gradient-text opacity-30">
            {project.title.charAt(0)}
          </span>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Category badge */}
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary/50 px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-full"
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="rounded-full"
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/0 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10" />
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="container relative mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary"
          >
            My Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-balance sm:text-5xl"
          >
            Featured <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-pretty"
          >
            Explore my latest projects showcasing my expertise in building 
            modern, scalable, and user-friendly applications.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'gradient-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
