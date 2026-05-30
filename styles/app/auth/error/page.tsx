'use client'

import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center animated-gradient p-6">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise" />

      <div className="relative w-full max-w-md text-center">
        <div className="glass-card rounded-2xl p-8">
          <div className="mb-4 inline-flex rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Authentication Error</h1>
          <p className="mb-6 text-muted-foreground">
            There was an error during the authentication process. Please try again.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
