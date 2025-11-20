'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSession, logoutUser } from '@/lib/auth'

interface Post {
  id: string
  title: string
  created_at: string
  upvotes_count: number
  image_url?: string
  spotify_data?: any
  user_id: string
  display_name: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)
    const session = getSession()
    setUser(session)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [sortBy, searchQuery])

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          created_at,
          upvotes_count,
          image_url,
          spotify_data,
          user_id
        `)
        .order(sortBy === 'recent' ? 'created_at' : 'upvotes_count', { 
          ascending: false
        })

      if (postsError) throw postsError

      if (postsData && postsData.length > 0) {
        // Fetch profiles for all users in posts
        const userIds = [...new Set(postsData.map(p => p.user_id))]
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, display_name')
          .in('id', userIds)

        if (profilesError) throw profilesError

        const profileMap = (profilesData || []).reduce((acc: any, profile: any) => {
          acc[profile.id] = profile.display_name
          return acc
        }, {})

        const enrichedPosts = postsData.map(post => ({
          ...post,
          display_name: profileMap[post.user_id] || post.user_id.substring(0, 8)
        }))

        let filtered = enrichedPosts
        if (searchQuery.trim()) {
          filtered = enrichedPosts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        setPosts(filtered as Post[])
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    router.push('/auth/login')
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-foreground text-background border-b-4 border-foreground">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link href="/" className="text-4xl font-black tracking-tighter">
            MUSIC FORUM
          </Link>
          
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link href="/create">
                  <Button className="border-4 border-background bg-background text-foreground hover:bg-foreground hover:text-background font-black uppercase text-sm">
                    CREATE POST
                  </Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-black uppercase hover:underline"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button className="border-4 border-background bg-background text-foreground hover:bg-foreground hover:text-background font-black uppercase text-sm">
                    LOGIN
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="border-4 border-background bg-foreground text-background hover:bg-background hover:text-foreground font-black uppercase text-sm">
                    SIGN UP
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="border-4 border-foreground p-8 mb-8 bg-background text-foreground">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-black uppercase block mb-3 border-b-4 border-foreground pb-2">SEARCH POSTS</label>
              <Input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-4 border-foreground bg-background text-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-black uppercase block mb-3 border-b-4 border-foreground pb-2">SORT BY</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('recent')}
                  className={`flex-1 py-3 px-4 border-4 font-black uppercase text-sm transition-colors ${
                    sortBy === 'recent'
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-background text-foreground border-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  RECENT
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`flex-1 py-3 px-4 border-4 font-black uppercase text-sm transition-colors ${
                    sortBy === 'popular'
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-background text-foreground border-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  POPULAR
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 border-4 border-foreground p-8">
              <p className="font-black uppercase text-lg">LOADING...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="border-4 border-foreground p-12 text-center bg-background text-foreground">
              <p className="font-black uppercase mb-6 text-lg">NO POSTS YET</p>
              {user ? (
                <Link href="/create">
                  <Button className="border-4 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground font-black uppercase">
                    CREATE THE FIRST POST
                  </Button>
                </Link>
              ) : (
                <p className="text-sm">
                  <Link href="/auth/sign-up" className="underline">Sign up</Link> to create the first post
                </p>
              )}
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                createdAt={post.created_at}
                upvotesCount={post.upvotes_count}
                displayName={post.display_name}
                imageUrl={post.image_url}
                spotifyData={post.spotify_data}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
