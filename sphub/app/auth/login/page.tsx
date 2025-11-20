'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { loginUser } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = loginUser(email, password)
      
      if (!result.success) {
        setError(result.error || 'Login failed')
      } else {
        router.push('/')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-sm border-4 border-foreground p-8 bg-background">
        <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">LOGIN</h1>
        <p className="text-sm text-foreground mb-8">Enter your credentials</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
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
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
        </form>

        <div className="mt-6 border-t-4 border-foreground pt-6">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="font-bold underline hover:no-underline">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
