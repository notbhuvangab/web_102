import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function Header() {
  const { session, isLoading, isAuthenticated, logout } = useAuth()

  if (isLoading) {
    return (
      <header className="bg-foreground text-background border-b-4 border-foreground">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link to="/" className="text-4xl font-black tracking-tighter">
            MUSIC FORUM
          </Link>
          <div className="text-sm font-black uppercase">LOADING...</div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-foreground text-background border-b-4 border-foreground">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link to="/" className="text-4xl font-black tracking-tighter">
          MUSIC FORUM
        </Link>
        
        <div className="flex gap-4 items-center">
          {isAuthenticated && session ? (
            <>
              <Link to="/create">
                <Button className="border-4 border-background bg-background text-foreground hover:bg-foreground hover:text-background font-black uppercase text-sm">
                  CREATE POST
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black uppercase">{session.displayName}</span>
                <button
                  onClick={logout}
                  className="text-sm font-black uppercase hover:underline"
                  type="button"
                >
                  LOGOUT
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button className="border-4 border-background bg-background text-foreground hover:bg-foreground hover:text-background font-black uppercase text-sm">
                  LOGIN
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button className="border-4 border-background bg-foreground text-background hover:bg-background hover:text-foreground font-black uppercase text-sm">
                  SIGN UP
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
