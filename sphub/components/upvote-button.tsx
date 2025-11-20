import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

interface UpvoteButtonProps {
  postId: string
  initialCount: number
  onUpvoteChange?: (count: number) => void
}

export function UpvoteButton({
  postId,
  initialCount,
  onUpvoteChange,
}: UpvoteButtonProps) {
  const [upvoteCount, setUpvoteCount] = useState(initialCount)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { session, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const supabase = createClient()

  useEffect(() => {
    // Refresh count from database and check if user has upvoted
    fetchUpvoteCount()
    checkIfUserUpvoted()
  }, [postId, session])

  const fetchUpvoteCount = async () => {
    try {
      const { data: postData } = await supabase
        .from('posts')
        .select('upvotes_count')
        .eq('id', postId)
        .single()

      if (postData) {
        setUpvoteCount(postData.upvotes_count || 0)
      }
    } catch (error) {
      console.error('Error fetching upvote count:', error)
    }
  }

  const checkIfUserUpvoted = async () => {
    if (!isAuthenticated || !session) {
      setHasUpvoted(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('upvotes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', session.userId)
        .limit(1)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is fine
        console.error('Error checking upvote:', error)
        return
      }

      setHasUpvoted(!!data)
    } catch (error) {
      console.error('Error checking if user upvoted:', error)
    }
  }

  const handleUpvote = async () => {
    if (!isAuthenticated || !session) {
      navigate('/auth/login')
      return
    }

    setIsLoading(true)

    try {
      if (hasUpvoted) {
        // Remove upvote
        const { error: deleteError } = await supabase
          .from('upvotes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', session.userId)

        if (deleteError) {
          throw deleteError
        }

        // Decrement the upvote count
        const newCount = Math.max(0, upvoteCount - 1)
        setUpvoteCount(newCount)
        setHasUpvoted(false)

        // Update post's upvote count
        await supabase
          .from('posts')
          .update({ upvotes_count: newCount })
          .eq('id', postId)

        onUpvoteChange?.(newCount)
      } else {
        // Add upvote
        // Check again if user has upvoted (race condition protection)
        const { data: existingUpvote } = await supabase
          .from('upvotes')
          .select('id')
          .eq('post_id', postId)
          .eq('user_id', session.userId)
          .maybeSingle()

        if (existingUpvote) {
          setHasUpvoted(true)
          setIsLoading(false)
          return
        }

        // Insert the upvote
        const { error: insertError } = await supabase.from('upvotes').insert({
          post_id: postId,
          user_id: session.userId,
        })

        if (insertError) {
          // If it's a unique constraint error, user already upvoted
          if (insertError.code === '23505' || insertError.message.includes('duplicate') || insertError.message.includes('unique')) {
            setHasUpvoted(true)
            setIsLoading(false)
            return
          }
          throw insertError
        }

        // Increment the upvote count
        const newCount = upvoteCount + 1
        setUpvoteCount(newCount)
        setHasUpvoted(true)

        // Update post's upvote count
        await supabase
          .from('posts')
          .update({ upvotes_count: newCount })
          .eq('id', postId)

        onUpvoteChange?.(newCount)
      }
    } catch (error) {
      console.error('Error toggling upvote:', error)
      // Refresh state from database on error
      await fetchUpvoteCount()
      await checkIfUserUpvoted()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={isLoading || !isAuthenticated}
      className={`border-4 border-black px-4 py-2 font-bold uppercase text-sm transition-colors flex items-center gap-2 font-mono ${
        hasUpvoted
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-white text-black hover:bg-black hover:text-white'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={
        !isAuthenticated
          ? 'Sign in to upvote'
          : hasUpvoted
          ? 'Click to remove upvote'
          : 'Click to upvote'
      }
    >
      <span className="text-lg">▲</span>
      <span>{upvoteCount} UPVOTE{upvoteCount !== 1 ? 'S' : ''}</span>
      {hasUpvoted && <span className="text-xs">(UPVOTED)</span>}
    </button>
  )
}
