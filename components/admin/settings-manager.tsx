'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Save, User, MapPin, Mail, Phone, Link, Github, Linkedin, Twitter, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { type Profile, updateProfile } from '@/lib/actions'

export function SettingsManager({ profile: initialProfile }: { profile: Profile | null }) {
  const [profile, setProfile] = useState<Partial<Profile>>(initialProfile || {
    name: 'the_arijit_187',
    title: 'Frontend Developer & UI/UX Designer',
    bio: '',
    email: '',
    phone: '',
    location: 'India',
    avatar_url: '',
    resume_url: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    available_for_work: true,
  })
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!initialProfile?.id) {
      console.error('No profile ID found')
      return
    }

    startTransition(async () => {
      try {
        await updateProfile(initialProfile.id, profile)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profile.name || ''}
                    onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={profile.title || ''}
                    onChange={e => setProfile(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profile.location || ''}
                    onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar_url" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Avatar URL
                  </Label>
                  <Input
                    id="avatar_url"
                    type="url"
                    value={profile.avatar_url || ''}
                    onChange={e => setProfile(prev => ({ ...prev, avatar_url: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Switch
                  id="available"
                  checked={profile.available_for_work}
                  onCheckedChange={checked => setProfile(prev => ({ ...prev, available_for_work: checked }))}
                />
                <Label htmlFor="available">Available for work</Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>How visitors can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ''}
                    onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone || ''}
                    onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-primary" />
                Social Links
              </CardTitle>
              <CardDescription>Connect your social profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    type="url"
                    value={profile.github_url || ''}
                    onChange={e => setProfile(prev => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/username"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={profile.linkedin_url || ''}
                    onChange={e => setProfile(prev => ({ ...prev, linkedin_url: e.target.value }))}
                    placeholder="https://linkedin.com/in/username"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={profile.twitter_url || ''}
                    onChange={e => setProfile(prev => ({ ...prev, twitter_url: e.target.value }))}
                    placeholder="https://twitter.com/username"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume URL
                  </Label>
                  <Input
                    id="resume"
                    type="url"
                    value={profile.resume_url || ''}
                    onChange={e => setProfile(prev => ({ ...prev, resume_url: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="gap-2">
            <Save className="h-4 w-4" />
            {isPending ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
