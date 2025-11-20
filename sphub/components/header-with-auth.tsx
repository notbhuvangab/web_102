import { useState, useEffect } from 'react'
import { getSession, logoutUser } from '@/lib/auth'
import { Link } from 'react-router-dom'

export function HeaderWithAuthClient() {
  const [session, setSession] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const currentSession = getSession()
    setSession(currentSession)
  }, [])

  if (!isClient) return null

  return (
    <div className="border-b-4 border-black bg-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold uppercase text-sm hover:underline">
          MUSIC FORUM
        </Link>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="font-bold uppercase text-sm">{session.displayName}</span>
            <button
              onClick={() => {
                logoutUser()
                window.location.reload()
              }}
              className="border-2 border-black px-3 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white"
            >
              LOGOUT
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
