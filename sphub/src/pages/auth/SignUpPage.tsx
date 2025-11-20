// Sign up page: Create account with user_id, password, and display_name
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { session, signUp, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const supabase = createClient()

  useEffect(() => {
    // If already logged in, redirect to home
    if (session) {
      navigate('/')
    }
  }, [session, navigate])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate inputs
    if (!userId.trim()) {
      setError('User ID is required')
      return
    }
    if (!password.trim()) {
      setError('Password is required')
      return
    }
    if (!displayName.trim()) {
      setError('Display name is required')
      return
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters')
      return
    }

    setIsLoading(true)

    try {
      // Sign up creates user and logs them in
      const result = await signUp(userId.trim(), password, displayName.trim())

      if (!result.success) {
        setError(result.error || 'Sign up failed')
        return
      }

      // Create profile in Supabase using the session from signUp
      if (result.session) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: result.session.userId,
            display_name: displayName.trim(),
          }, {
            onConflict: 'id'
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Continue anyway - user is created locally
        }
      }

      // Redirect to home
      navigate('/')
    } catch (err) {
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
        <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">SIGN UP</h1>
        <p className="text-sm text-foreground mb-8">Create your account</p>
        
        <form onSubmit={handleSignUp} className="space-y-6">
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
            <p className="text-xs text-muted-foreground">This will be your unique identifier</p>
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
              minLength={3}
              className="border-4 border-foreground bg-background text-foreground"
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">At least 3 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-xs font-bold uppercase">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
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
            <Link to="/auth/login" className="font-bold underline hover:no-underline">
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
