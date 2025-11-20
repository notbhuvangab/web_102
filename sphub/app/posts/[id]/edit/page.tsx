'use client'

import { useEffect, useState } from 'react'
import { getSession } from '@/lib/auth'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

interface Post {
  id: string
  title: string
  content?: string
  image_url?: string
  user_id: string
}

export default function EditPostPage() {
  const params = useParams()
  const id = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const session = getSession()
    setCurrentUserId(session?.userId || null)
  }, [])

  const fetchPost = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      setPost(data as Post)
      setTitle(data.title)
      setContent(data.content || '')
      setImageUrl(data.image_url || '')

      if (currentUserId && currentUserId !== data.user_id) {
        setError('You do not have permission to edit this post')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!id || !currentUserId) return
    fetchPost()
  }, [id, currentUserId])

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    if (!currentUserId || !post || currentUserId !== post.user_id) {
      setError('You do not have permission to edit this post')
      return
    }

    setIsSaving(true)

    try {
      const { error: updateError } = await supabase
        .from('posts')
        .update({
          title: title.trim(),
          content: content.trim() || null,
          image_url: imageUrl.trim() || null,
        })
        .eq('id', id)

      if (updateError) throw updateError

      router.push(`/posts/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-bold uppercase">LOADING...</p>
      </div>
    )
  }

  if (error && error.includes('do not have permission')) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="font-bold uppercase mb-4">{error}</p>
          <Link href="/">
            <Button className="border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-bold uppercase">
              BACK HOME
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-foreground">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-3xl font-black tracking-tighter hover:underline">
            MUSIC FORUM
          </Link>
        </div>
      </header>

      {/* Edit Post Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black tracking-tighter mb-8 uppercase">EDIT POST</h1>

        <form onSubmit={handleUpdatePost} className="space-y-6">
          {/* Title */}
          <div className="border-2 border-foreground p-6 space-y-2">
            <label htmlFor="title" className="text-xs font-bold uppercase block">
              POST TITLE
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-foreground text-base"
              required
            />
          </div>

          {/* Content */}
          <div className="border-2 border-foreground p-6 space-y-2">
            <label htmlFor="content" className="text-xs font-bold uppercase block">
              CONTENT
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-foreground min-h-40"
            />
          </div>

          {/* Image URL */}
          <div className="border-2 border-foreground p-6 space-y-2">
            <label htmlFor="imageUrl" className="text-xs font-bold uppercase block">
              IMAGE URL
            </label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border-foreground"
            />
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-48 object-cover border-2 border-foreground"
                />
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="border-2 border-destructive bg-background p-4">
              <p className="text-sm text-destructive font-bold uppercase">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-bold uppercase"
            >
              {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
            </Button>
            <Link href={`/posts/${id}`} className="flex-1">
              <Button className="w-full border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background font-bold uppercase">
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
