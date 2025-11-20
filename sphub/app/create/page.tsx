'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SpotifyUrlExtractor } from '@/components/spotify-url-extractor'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSession, logoutUser } from '@/lib/auth'

interface SpotifyData {
  title?: string
  artist?: string
  imageUrl?: string
  url?: string
}

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)
  const [spotifyUrl, setSpotifyUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)
    const session = getSession()
    if (!session) {
      router.push('/auth/login')
    } else {
      setUser(session)
      setIsAuthorized(true)
    }
  }, [])

  const handleSpotifyDataExtracted = (data: SpotifyData) => {
    setSpotifyData(data)
    setSpotifyUrl(data.url || '')
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    if (!user) {
      setError('You must be logged in to create a post')
      return
    }

    setIsLoading(true)

    try {
      console.log("[v0] Creating post with data:", { user_id: user.userId, title, content, image_url: imageUrl, spotify_url: spotifyUrl })
      
      const { error: insertError } = await supabase.from('posts').insert({
        user_id: user.userId,
        title: title.trim(),
        content: content.trim() || null,
        image_url: imageUrl.trim() || null,
        spotify_url: spotifyUrl.trim() || null,
        spotify_data: spotifyData || null,
      })

      console.log("[v0] Insert error:", insertError)

      if (insertError) throw insertError

      router.push('/')
    } catch (err) {
      console.log("[v0] Catch error:", err)
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient || !isAuthorized) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-bold uppercase">LOADING...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-foreground text-background border-b-4 border-foreground">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-3xl font-black tracking-tighter hover:underline">
            MUSIC FORUM
          </Link>
        </div>
      </header>

      {/* Create Post Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black tracking-tighter mb-8 uppercase">CREATE POST</h1>

        <form onSubmit={handleCreatePost} className="space-y-6">
          {/* Title */}
          <div className="border-4 border-foreground p-6 space-y-2 bg-background text-foreground">
            <label htmlFor="title" className="text-xs font-black uppercase block border-b-4 border-foreground pb-2">
              POST TITLE
            </label>
            <Input
              id="title"
              type="text"
              placeholder="What music are you sharing?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-4 border-foreground bg-background text-foreground text-base"
              required
            />
          </div>

          {/* Spotify URL Extractor */}
          <SpotifyUrlExtractor
            onDataExtracted={handleSpotifyDataExtracted}
            isLoading={isLoading}
          />

          {/* Display Extracted Spotify Data */}
          {spotifyData && (
            <div className="border-4 border-black p-6 bg-white text-black">
              <h3 className="font-black uppercase mb-4 text-sm border-b-4 border-black pb-2">SPOTIFY TRACK</h3>
              {spotifyUrl && spotifyUrl.includes('/track/') && (
                <div className="mb-4">
                  {(() => {
                    const trackId = spotifyUrl.split('/track/')[1]?.split('?')[0]
                    if (trackId) {
                      return (
                        <iframe
                          style={{borderRadius: '4px'}}
                          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      )
                    }
                    return null
                  })()}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setSpotifyData(null)
                  setSpotifyUrl('')
                }}
                className="text-xs font-black text-red-600 mt-2 hover:underline"
              >
                REMOVE
              </button>
            </div>
          )}

          {/* Content */}
          <div className="border-4 border-foreground p-6 space-y-2 bg-background text-foreground">
            <label htmlFor="content" className="text-xs font-black uppercase block border-b-4 border-foreground pb-2">
              CONTENT (OPTIONAL)
            </label>
            <Textarea
              id="content"
              placeholder="Add your thoughts about this music..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-4 border-foreground bg-background text-foreground min-h-40"
            />
          </div>

          {/* Image URL */}
          <div className="border-4 border-foreground p-6 space-y-2 bg-background text-foreground">
            <label htmlFor="imageUrl" className="text-xs font-black uppercase block border-b-4 border-foreground pb-2">
              IMAGE URL (OPTIONAL)
            </label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border-4 border-foreground bg-background text-foreground"
            />
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-48 object-cover border-4 border-foreground"
                />
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="border-4 border-destructive bg-background p-4 text-foreground">
              <p className="text-sm text-destructive font-black uppercase">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 border-4 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-black uppercase"
            >
              {isLoading ? 'CREATING...' : 'CREATE POST'}
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full border-4 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background font-black uppercase">
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
