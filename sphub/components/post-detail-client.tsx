import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

interface PostDetailClientProps {
  postId: string
  userId: string
}

export function PostDetailClient({ postId, userId }: PostDetailClientProps) {
  const [error, setError] = useState<string | null>(null)
  const { session } = useAuth()
  const navigate = useNavigate()
  const supabase = createClient()
  const currentUserId = session?.userId || null

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId)
      if (error) throw error
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  if (currentUserId !== userId) {
    return null
  }

  return (
    <div className="flex gap-2">
      <Link to={`/posts/${postId}/edit`}>
        <Button className="border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase text-sm font-mono">
          EDIT
        </Button>
      </Link>
      <button
        onClick={handleDelete}
        className="border-4 border-black bg-white text-black hover:bg-black hover:text-white font-bold uppercase text-sm px-4 py-2 font-mono"
      >
        DELETE
      </button>
    </div>
  )
}
