import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getSession, updateDisplayName, logout as logoutFn, Session, signUp as signUpFn, login as loginFn } from '@/lib/auth'

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (userId: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string; session?: Session }>
  login: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateDisplayName: (name: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load session on mount (might be null if not logged in)
    const currentSession = getSession()
    setSession(currentSession)
    setIsLoading(false)

    // Listen for storage changes (sync across tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'forum_session') {
        const updatedSession = getSession()
        setSession(updatedSession)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleSignUp = async (userId: string, password: string, displayName: string): Promise<{ success: boolean; error?: string; session?: Session }> => {
    const result = signUpFn(userId, password, displayName)
    if (result.success && result.session) {
      setSession(result.session)
    }
    return {
      success: result.success,
      error: result.error,
      session: result.session,
    }
  }

  const handleLogin = async (userId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = loginFn(userId, password)
    if (result.success && result.session) {
      setSession(result.session)
    }
    return {
      success: result.success,
      error: result.error,
    }
  }

  const handleLogout = () => {
    // Clear session
    logoutFn()
    // Update state
    setSession(null)
  }

  const handleUpdateDisplayName = async (name: string): Promise<{ success: boolean; error?: string }> => {
    const result = updateDisplayName(name)
    if (result.success) {
      const updatedSession = getSession()
      if (updatedSession) {
        setSession(updatedSession)
      }
    }
    return result
  }

  const value = {
    session,
    isLoading,
    isAuthenticated: !!session,
    signUp: handleSignUp,
    login: handleLogin,
    logout: handleLogout,
    updateDisplayName: handleUpdateDisplayName,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
