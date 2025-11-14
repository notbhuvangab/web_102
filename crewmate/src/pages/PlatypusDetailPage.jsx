import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { PerryAvatar } from '@/components/perry-avatar'
import { EditButton } from '@/components/edit-button'
import { DeleteButton } from '@/components/delete-button'
import { createBrowserClient } from '@/lib/supabase/client'

export default function PlatypusDetailPage() {
  const { id } = useParams()
  const [platypus, setPlatypus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()
    
    async function fetchPlatypus() {
      try {
        const { data, error } = await supabase
          .from('platypuses')
          .select('*')
          .eq('id', id)
          .single()

        if (error || !data) {
          setNotFound(true)
          return
        }

        setPlatypus(data)
      } catch (err) {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPlatypus()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen p-12">
        <div className="text-center">
          <p className="text-3xl text-black">Loading...</p>
        </div>
      </div>
    )
  }

  if (notFound || !platypus) {
    return <Navigate to="/gallery" replace />
  }

  // Generate a message based on speed
  let speedMessage = ''
  if (platypus.speed < 2) {
    speedMessage = 'This platypus is a bit slow, might want to find one with more speed!'
  } else if (platypus.speed < 4) {
    speedMessage = 'A decent platypus with moderate speed.'
  } else if (platypus.speed < 6) {
    speedMessage = 'Pretty fast platypus!'
  } else {
    speedMessage = 'Lightning fast platypus! Top tier agent material!'
  }

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-black text-center mb-12">
          Platypus: {platypus.name}
        </h1>

        <div className="bg-zinc-400 border-4 border-black p-12 mb-8">
          <div className="flex justify-center mb-8">
            <PerryAvatar color={platypus.color} size={200} />
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-white border-4 border-black p-6">
              <h2 className="text-2xl font-bold mb-4">Stats:</h2>
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-bold text-xl">Color:</span>
                  <span className="font-mono text-xl capitalize">{platypus.color}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-bold text-xl">Speed:</span>
                  <span className="font-mono text-xl">{platypus.speed} mph</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-6">
              <p className="text-xl font-bold">{speedMessage}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <EditButton platypus={platypus} />
            <DeleteButton id={platypus.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

