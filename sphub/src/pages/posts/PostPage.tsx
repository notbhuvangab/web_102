import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CommentSection } from '@/components/comment-section'
import { UpvoteButton } from '@/components/upvote-button'
import { Button } from '@/components/ui/button'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { PostDetailClient } from '@/components/post-detail-client'

interface Post {
  id: string
  title: string
  content?: string
  image_url?: string
  video_url?: string
  spotify_url?: string
  spotify_data?: any
  flag?: string
  referenced_post_id?: string
  created_at: string
  upvotes_count: number
  user_id: string
}

interface ReferencedPost {
  id: string
  title: string
  user_id: string
}

export default function PostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [profile, setProfile] = useState<{ display_name: string } | null>(null)
  const [referencedPost, setReferencedPost] = useState<ReferencedPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const supabase = createClient()

  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single()

        if (postError || !postData) {
          setError('Post not found')
          return
        }

        setPost(postData as Post)

        const { data: profileData } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', postData.user_id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }

        // Fetch referenced post if exists
        if (postData.referenced_post_id) {
          const { data: refPostData } = await supabase
            .from('posts')
            .select('id, title, user_id')
            .eq('id', postData.referenced_post_id)
            .single()

          if (refPostData) {
            setReferencedPost(refPostData as ReferencedPost)
          }
        }
      } catch (err) {
        setError('Error loading post')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getSpotifyTrackId = (url: string) => {
    const match = url?.match(/track\/([a-zA-Z0-9]+)/)
    return match ? match[1] : null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center border-4 border-black">
        <p className="font-bold uppercase font-mono">LOADING...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center border-4 border-black">
        <div className="text-center">
          <p className="font-bold uppercase mb-4 font-mono">POST NOT FOUND</p>
          <Link to="/">
            <Button className="border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase font-mono">
              BACK HOME
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const spotifyTrackId = post.spotify_url ? getSpotifyTrackId(post.spotify_url) : null

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Post Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="border-4 border-black p-8 mb-8 bg-white">
          {/* Title and Meta */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-black tracking-tighter font-mono">{post.title}</h1>
              {post.flag && (
                <span className="text-xs font-black uppercase px-3 py-1 border-4 border-black bg-white text-black">
                  {post.flag}
                </span>
              )}
            </div>
            
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

          {/* Referenced Post (Repost) */}
          {referencedPost && (
            <div className="mb-6 pb-6 border-b-4 border-black">
              <p className="text-xs font-bold uppercase text-black mb-4 font-mono">REFERENCED POST</p>
              <Link to={`/posts/${referencedPost.id}`} className="block border-4 border-black p-4 hover:bg-black hover:text-white transition-colors">
                <p className="font-bold text-lg mb-2">{referencedPost.title}</p>
                <p className="text-sm opacity-70">View original post →</p>
              </Link>
            </div>
          )}

          {/* Video */}
          {post.video_url && (
            <div className="mb-6 pb-6 border-b-4 border-black">
              <p className="text-xs font-bold uppercase text-black mb-4 font-mono">VIDEO</p>
              <div className="border-4 border-black">
                {(() => {
                  // YouTube
                  if (post.video_url.includes('youtube.com/watch') || post.video_url.includes('youtu.be/')) {
                    const videoId = post.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
                    if (videoId) {
                      return (
                        <iframe
                          width="100%"
                          height="400"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )
                    }
                  }
                  // Vimeo
                  if (post.video_url.includes('vimeo.com/')) {
                    const videoId = post.video_url.match(/vimeo\.com\/(\d+)/)?.[1]
                    if (videoId) {
                      return (
                        <iframe
                          src={`https://player.vimeo.com/video/${videoId}`}
                          width="100%"
                          height="400"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      )
                    }
                  }
                  // Generic iframe or link
                  return (
                    <div className="p-4 text-center">
                      <a href={post.video_url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold underline">
                        Watch Video
                      </a>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}

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
}

