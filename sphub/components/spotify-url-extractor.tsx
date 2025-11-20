import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SpotifyData {
  title?: string
  artist?: string
  imageUrl?: string
  url?: string
}

interface SpotifyUrlExtractorProps {
  onDataExtracted: (data: SpotifyData) => void
  isLoading: boolean
}

export function SpotifyUrlExtractor({ onDataExtracted, isLoading }: SpotifyUrlExtractorProps) {
  const [spotifyUrl, setSpotifyUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const extractSpotifyData = async () => {
    setError(null)

    // Basic Spotify URL validation
    if (!spotifyUrl.includes('spotify.com/track/')) {
      setError('Please provide a valid Spotify track URL')
      return
    }

    try {
      // Extract track ID from URL
      const trackId = spotifyUrl.split('/track/')[1]?.split('?')[0]
      if (!trackId) {
        setError('Could not extract track ID from URL')
        return
      }

      const spotifyData: SpotifyData = {
        url: spotifyUrl,
        title: `Spotify Track: ${trackId}`,
      }

      onDataExtracted(spotifyData)
      setSpotifyUrl('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract Spotify data')
    }
  }

  return (
    <div className="border-2 border-foreground p-6 space-y-4">
      <h3 className="text-lg font-bold uppercase">ADD SPOTIFY TRACK</h3>
      
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase block">SPOTIFY TRACK URL</label>
        <Input
          type="url"
          placeholder="https://open.spotify.com/track/..."
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          className="border-foreground"
        />
        <p className="text-xs text-muted-foreground">
          Paste a link to a Spotify track (e.g., from the share menu)
        </p>
      </div>

      {error && (
        <div className="border-2 border-destructive bg-background p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        onClick={extractSpotifyData}
        disabled={isLoading || spotifyUrl.length === 0}
        className="w-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-bold uppercase text-sm"
      >
        EXTRACT TRACK DATA
      </Button>
    </div>
  )
}
