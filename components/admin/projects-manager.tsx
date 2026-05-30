'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, ExternalLink, Github, Star, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Project, createProject, updateProject, deleteProject } from '@/lib/actions'

type ProjectFormData = Omit<Project, 'id' | 'created_at' | 'updated_at'>

const defaultFormData: ProjectFormData = {
  title: '',
  description: '',
  image_url: null,
  tags: [],
  category: 'Web App',
  live_url: null,
  github_url: null,
  featured: false,
  display_order: 0,
}

export function ProjectsManager({ projects: initialProjects }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData)
  const [tagsInput, setTagsInput] = useState('')
  const [isPending, startTransition] = useTransition()

  const openCreateDialog = () => {
    setEditingProject(null)
    setFormData(defaultFormData)
    setTagsInput('')
    setIsOpen(true)
  }

  const openEditDialog = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      tags: project.tags,
      category: project.category,
      live_url: project.live_url,
      github_url: project.github_url,
      featured: project.featured,
      display_order: project.display_order,
    })
    setTagsInput(project.tags.join(', '))
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      ...formData,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    }

    startTransition(async () => {
      try {
        if (editingProject) {
          await updateProject(editingProject.id, data)
          setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...data } : p))
        } else {
          await createProject(data)
          // Refresh will happen via revalidation
          window.location.reload()
        }
        setIsOpen(false)
      } catch (error) {
        console.error('Failed to save project:', error)
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    startTransition(async () => {
      try {
        await deleteProject(id)
        setProjects(prev => prev.filter(p => p.id !== id))
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Create Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web App">Web App</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                      <SelectItem value="UI Library">UI Library</SelectItem>
                      <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={3}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="React, Next.js, TypeScript"
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input
                    id="live_url"
                    type="url"
                    value={formData.live_url || ''}
                    onChange={e => setFormData(prev => ({ ...prev, live_url: e.target.value || null }))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={formData.github_url || ''}
                    onChange={e => setFormData(prev => ({ ...prev, github_url: e.target.value || null }))}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url || ''}
                    onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value || null }))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={e => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={checked => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : editingProject ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <button className="mt-1 text-muted-foreground hover:text-foreground cursor-grab">
                    <GripVertical className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg truncate">{project.title}</h3>
                      {project.featured && (
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      )}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(project)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
                      disabled={isPending}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="glass-card border-border/50">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No projects yet. Create your first project!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
