// Login page: Authenticate with user_id and password
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { session, login, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If already logged in, redirect to home
    if (session) {
      navigate('/')
    }
  }, [session, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(userId.trim(), password)

      if (!result.success) {
        setError(result.error || 'Login failed')
        return
      }

      // Login successful, redirect to home
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-bold uppercase">LOADING...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-sm border-4 border-foreground p-8 bg-background">
        <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">LOGIN</h1>
        <p className="text-sm text-foreground mb-8">Enter your credentials</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-xs font-bold uppercase">User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="your_user_id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="border-4 border-foreground bg-background text-foreground"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-bold uppercase">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-4 border-foreground bg-background text-foreground"
              autoComplete="current-password"
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
            <Link to="/auth/sign-up" className="font-bold underline hover:no-underline">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
