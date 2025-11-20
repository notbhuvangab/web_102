import type { Metadata, Viewport } from 'next'
import { Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { useState, useEffect } from 'react'
import { getSession, logoutUser } from '@/lib/auth' // Updated import path

const _courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Music Forum',
  description: 'Share and discuss music with the community',
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000'
}

function HeaderWithAuthClient() {
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
        <div />
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className="font-mono antialiased bg-white text-black">
        <HeaderWithAuthClient />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
