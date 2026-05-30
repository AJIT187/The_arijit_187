'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import {
  FolderKanban,
  MessageSquareQuote,
  Mail,
  TrendingUp,
  Eye,
  Users,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    change: '+2 this month',
    icon: FolderKanban,
    href: '/admin/projects',
  },
  {
    name: 'Testimonials',
    value: '8',
    change: '+3 this month',
    icon: MessageSquareQuote,
    href: '/admin/testimonials',
  },
  {
    name: 'Messages',
    value: '24',
    change: '5 unread',
    icon: Mail,
    href: '/admin/messages',
  },
  {
    name: 'Profile Views',
    value: '1.2K',
    change: '+15% this week',
    icon: Eye,
    href: '/admin/profile',
  },
]

const recentActivity = [
  { type: 'message', text: 'New message from Sarah Johnson', time: '5 min ago' },
  { type: 'project', text: 'Project "E-Commerce Platform" updated', time: '2 hours ago' },
  { type: 'testimonial', text: 'New testimonial received', time: '1 day ago' },
  { type: 'message', text: 'New message from Michael Chen', time: '2 days ago' },
]

export default function AdminDashboard() {
  const [user, setUser] = useState<{ email?: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-muted-foreground"
            >
              Here&apos;s what&apos;s happening with your portfolio today.
            </motion.p>
          </div>

          {/* Stats grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={stat.href}
                  className="group block rounded-xl glass-card p-6 transition-all hover:border-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Content grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  asChild
                  variant="outline"
                  className="h-auto justify-start gap-3 p-4"
                >
                  <Link href="/admin/projects">
                    <FolderKanban className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Add Project</p>
                      <p className="text-xs text-muted-foreground">
                        Showcase your work
                      </p>
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto justify-start gap-3 p-4"
                >
                  <Link href="/admin/testimonials">
                    <MessageSquareQuote className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Add Testimonial</p>
                      <p className="text-xs text-muted-foreground">
                        Client feedback
                      </p>
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto justify-start gap-3 p-4"
                >
                  <Link href="/admin/messages">
                    <Mail className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">View Messages</p>
                      <p className="text-xs text-muted-foreground">
                        5 unread messages
                      </p>
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto justify-start gap-3 p-4"
                >
                  <Link href="/" target="_blank">
                    <Users className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">View Portfolio</p>
                      <p className="text-xs text-muted-foreground">
                        See public site
                      </p>
                    </div>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
