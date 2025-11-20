import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from '@/lib/supabase/client'
import { getUserByIdFromStorage } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatDistanceToNow } from 'date-fns'

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
}

interface CommentWithProfile extends Comment {
  display_name: string
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithProfile[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { session } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    setIsFetching(true)
    try {
      // Fetch comments with profile data
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:user_id (
            display_name
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (data && data.length > 0) {
        const commentsWithProfiles = data.map(comment => {
          const profile = comment.profiles as { display_name: string } | null
          return {
            ...comment,
            display_name: profile?.display_name || comment.user_id.substring(0, 8)
          }
        })
        setComments(commentsWithProfiles)
      } else {
        setComments([])
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
      // Fallback: try without profile join
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('id, content, created_at, user_id')
          .eq('post_id', postId)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        if (data) {
          const commentsWithProfiles = data.map(comment => {
            const user = getUserByIdFromStorage(comment.user_id)
            return {
              ...comment,
              display_name: user?.displayName || comment.user_id.substring(0, 8)
            }
          })
          setComments(commentsWithProfiles)
        }
      } catch (fallbackErr) {
        console.error('Fallback fetch failed:', fallbackErr)
        setComments([])
      }
    } finally {
      setIsFetching(false)
    }
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.from('comments').insert({
        post_id: postId,
        user_id: session.userId,
        content: newComment,
      })

      if (error) throw error

      setNewComment('')
      await fetchComments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId)
      if (error) throw error
      await fetchComments()
    } catch (err) {
      console.error('Error deleting comment:', err)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight uppercase font-mono">COMMENTS</h2>

      {/* Add Comment Form */}
      {session ? (
        <form onSubmit={handleAddComment} className="border-4 border-black p-6 space-y-4 bg-white font-mono">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border-4 border-black min-h-24 bg-white text-black"
          />
          {error && <p className="text-sm text-red-600 font-bold">{error}</p>}
          <Button
            type="submit"
            disabled={isLoading || newComment.trim().length === 0}
            className="border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase"
          >
            {isLoading ? 'POSTING...' : 'POST COMMENT'}
          </Button>
        </form>
      ) : (
        <div className="border-4 border-black p-6 text-center bg-white font-mono">
          <p className="text-sm text-black mb-4 font-bold">Sign in to leave a comment</p>
          <Link 
            to="/auth/login"
            className="inline-block border-4 border-black bg-black text-white hover:bg-white hover:text-black font-bold uppercase text-sm px-4 py-2"
          >
            LOGIN
          </Link>
        </div>
      )}

      {/* Comments List */}
      {isFetching ? (
        <div className="text-center py-8 font-mono">
          <p className="font-bold uppercase">LOADING COMMENTS...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="border-4 border-black p-6 text-center bg-white font-mono">
          <p className="font-bold uppercase">NO COMMENTS YET</p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="border-4 border-black p-4 bg-white font-mono">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <p className="font-bold text-sm">{comment.display_name}</p>
                  <p className="text-xs text-gray-600">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </p>
                </div>
                {session && session.userId === comment.user_id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    DELETE
                  </button>
                )}
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
