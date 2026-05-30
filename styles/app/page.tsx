import { MouseGlow } from '@/components/portfolio/mouse-glow'
import { Navigation } from '@/components/portfolio/navigation'
import { HeroSection } from '@/components/portfolio/hero-section'
import { AboutSection } from '@/components/portfolio/about-section'
import { SkillsSection } from '@/components/portfolio/skills-section'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { ServicesSection } from '@/components/portfolio/services-section'
import { TestimonialsSection } from '@/components/portfolio/testimonials-section'
import { FAQSection } from '@/components/portfolio/faq-section'
import { ContactSection } from '@/components/portfolio/contact-section'
import { Footer } from '@/components/portfolio/footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <MouseGlow />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
