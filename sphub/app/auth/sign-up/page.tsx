'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createUser, loginUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (displayName.trim().length === 0) {
      setError('Display name is required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const createResult = createUser(email, password, displayName)
      
      if (!createResult.success) {
        setError(createResult.error || 'Sign up failed')
        return
      }

      if (createResult.userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: createResult.userId,
            display_name: displayName
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Continue anyway - user is still created locally
        }
      }

      // Auto-login after signup
      const loginResult = loginUser(email, password)
      if (loginResult.success) {
        router.push('/')
      } else {
        router.push('/auth/login')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-sm border-4 border-foreground p-8 bg-background">
        <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">SIGN UP</h1>
        <p className="text-sm text-foreground mb-8">Create your account</p>
        
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-xs font-bold uppercase">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="border-4 border-foreground bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-4 border-foreground bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-bold uppercase">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-4 border-foreground bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border-4 border-foreground bg-background text-foreground"
            />
          </div>

          {error && (
            <div className="border-4 border-destructive bg-background p-3">
              <p className="text-sm text-destructive font-bold">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full border-4 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-black uppercase"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </Button>
        </form>

        <div className="mt-6 border-t-4 border-foreground pt-6">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold underline hover:no-underline">
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
