import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlatypusCard } from '@/components/platypus-card'
import { createBrowserClient } from '@/lib/supabase/client'

export default function GalleryPage() {
  const [platypuses, setPlatypuses] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()
    
    async function fetchPlatypuses() {
      try {
        const { data, error: fetchError } = await supabase
          .from('platypuses')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setPlatypuses(data || [])
      } catch (err) {
        console.error('[v0] Error fetching platypuses:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlatypuses()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-12">
        <h1 className="text-5xl font-bold text-black text-center mb-12">
          Your Platypus Gallery!
        </h1>
        <div className="text-center">
          <p className="text-3xl text-black">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-12">
      <h1 className="text-5xl font-bold text-black text-center mb-12">
        Your Platypus Gallery!
      </h1>
      {error ? (
        <div className="text-center">
          <p className="text-3xl text-red-500 mb-8">Error: {error}</p>
        </div>
      ) : !platypuses || platypuses.length === 0 ? (
        <div className="text-center">
          <p className="text-3xl text-black mb-8">
            You haven't created a platypus yet!
          </p>
          <Link
            to="/create"
            className="inline-block bg-white text-black font-bold py-4 px-8 border-4 border-black hover:bg-black hover:text-white transition-none text-xl"
          >
            Create one here!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {platypuses.map((platypus) => (
            <PlatypusCard key={platypus.id} platypus={platypus} />
          ))}
        </div>
      )}
    </div>
  )
}

