'use server'

import { createClient } from '@/lib/supabase/server'
import { CommentSection } from '@/components/comment-section'
import { UpvoteButton } from '@/components/upvote-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { PostDetailClient } from '@/components/post-detail-client'

interface Post {
  id: string
  title: string
  content?: string
  image_url?: string
  spotify_url?: string
  spotify_data?: any
  created_at: string
  upvotes_count: number
  user_id: string
}

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const supabase = await createClient()

  try {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (postError || !post) {
      return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center border-4 border-black">
          <div className="text-center">
            <p className="font-bold uppercase mb-4 font-mono">POST NOT FOUND</p>
            <Link href="/">
              <Button className="border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase font-mono">
                BACK HOME
              </Button>
            </Link>
          </div>
        </div>
      )
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', post.user_id)
      .single()

    const getSpotifyTrackId = (url: string) => {
      const match = url?.match(/track\/([a-zA-Z0-9]+)/)
      return match ? match[1] : null
    }

    const spotifyTrackId = post.spotify_url ? getSpotifyTrackId(post.spotify_url) : null

    return (
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <header className="border-b-4 border-black bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="text-3xl font-black tracking-tighter hover:underline font-mono">
              MUSIC FORUM
            </Link>
          </div>
        </header>

        {/* Post Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="border-4 border-black p-8 mb-8 bg-white">
            {/* Title and Meta */}
            <div className="mb-6">
              <h1 className="text-4xl font-black tracking-tighter mb-4 font-mono">{post.title}</h1>
              
              <div className="flex gap-4 text-sm font-bold uppercase mb-4 pb-4 border-b-4 border-black font-mono">
                <span>by {profile?.display_name || post.user_id.substring(0, 8)}</span>
                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
              </div>

              <div className="mb-4">
                <UpvoteButton
                  postId={post.id}
                  initialCount={post.upvotes_count}
                />
              </div>

              <PostDetailClient postId={post.id} userId={post.user_id} />
            </div>

            {spotifyTrackId && (
              <div className="mb-6 pb-6 border-b-4 border-black">
                <p className="text-xs font-bold uppercase text-black mb-4 font-mono">SPOTIFY TRACK</p>
                <iframe
                  style={{ borderRadius: '0px' }}
                  src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="border-4 border-black"
                />
              </div>
            )}

            {/* Image */}
            {post.image_url && (
              <div className="mb-6 pb-6 border-b-4 border-black">
                <img
                  src={post.image_url || "/placeholder.svg?key=d9k3"}
                  alt={post.title}
                  className="w-full max-h-96 object-cover border-4 border-black"
                />
              </div>
            )}

            {/* Content */}
            {post.content && (
              <div className="mb-6 font-mono">
                <p className="whitespace-pre-wrap text-base leading-relaxed">{post.content}</p>
              </div>
            )}
          </article>

          {/* Comments */}
          <CommentSection postId={post.id} />
        </main>
      </div>
    )
  } catch (err) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center border-4 border-black">
        <div className="text-center">
          <p className="font-bold uppercase mb-4 font-mono">ERROR LOADING POST</p>
          <Link href="/">
            <Button className="border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase font-mono">
              BACK HOME
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
