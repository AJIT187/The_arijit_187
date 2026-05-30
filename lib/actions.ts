'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

// Types
export type Project = {
  id: string
  title: string
  description: string
  image_url: string | null
  tags: string[]
  category: string
  live_url: string | null
  github_url: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  company: string | null
  avatar_url: string | null
  rating: number
  content: string
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  display_order: number
  created_at: string
  updated_at: string
}

export type FAQ = {
  id: string
  question: string
  answer: string
  display_order: number
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export type Profile = {
  id: string
  name: string
  title: string | null
  bio: string | null
  email: string | null
  phone: string | null
  location: string | null
  avatar_url: string | null
  resume_url: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  available_for_work: boolean
  updated_at: string
}

export type Skill = {
  id: string
  name: string
  level: number
  category: string
  display_order: number
  created_at: string
}

// Portfolio data fetching (public)
export async function getProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as Project[]
}

export async function getTestimonials() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as Testimonial[]
}

export async function getServices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as Service[]
}

export async function getFAQs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as FAQ[]
}

export async function getProfile() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data as Profile | null
}

export async function getSkills() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data as Skill[]
}

export async function getMessages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Message[]
}

// Contact form submission (public)
export async function submitContactForm(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').insert(formData)
  
  if (error) throw error
  return { success: true }
}

// Admin actions (requires authentication)
export async function createProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').insert(data)
  if (error) throw error
  revalidateTag('projects', 'max')
}

export async function updateProject(id: string, data: Partial<Project>) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').update(data).eq('id', id)
  if (error) throw error
  revalidateTag('projects', 'max')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
  revalidateTag('projects', 'max')
}

export async function createTestimonial(data: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').insert(data)
  if (error) throw error
  revalidateTag('testimonials', 'max')
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').update(data).eq('id', id)
  if (error) throw error
  revalidateTag('testimonials', 'max')
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
  revalidateTag('testimonials', 'max')
}

export async function createService(data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').insert(data)
  if (error) throw error
  revalidateTag('services', 'max')
}

export async function updateService(id: string, data: Partial<Service>) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').update(data).eq('id', id)
  if (error) throw error
  revalidateTag('services', 'max')
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
  revalidateTag('services', 'max')
}

export async function createFAQ(data: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').insert(data)
  if (error) throw error
  revalidateTag('faqs', 'max')
}

export async function updateFAQ(id: string, data: Partial<FAQ>) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').update(data).eq('id', id)
  if (error) throw error
  revalidateTag('faqs', 'max')
}

export async function deleteFAQ(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) throw error
  revalidateTag('faqs', 'max')
}

export async function updateProfile(id: string, data: Partial<Profile>) {
  const supabase = await createClient()
  const { error } = await supabase.from('profile').update(data).eq('id', id)
  if (error) throw error
  revalidateTag('profile', 'max')
}

export async function createSkill(data: Omit<Skill, 'id' | 'created_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('skills').insert(data)
  if (error) throw error
  revalidateTag('skills', 'max')
}

export async function updateSkill(id: string, data: Partial<Skill>) {
  const supabase = await createClient()
  const { error } = await supabase.from('skills').update(data).eq('id', id)
  if (error) throw error
  revalidateTag('skills', 'max')
}

export async function deleteSkill(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('skills').delete().eq('id', id)
  if (error) throw error
  revalidateTag('skills', 'max')
}

export async function markMessageAsRead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id)
  if (error) throw error
  revalidateTag('messages', 'max')
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (error) throw error
  revalidateTag('messages', 'max')
}
