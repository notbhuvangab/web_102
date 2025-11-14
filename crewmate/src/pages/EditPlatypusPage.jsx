import { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { PlatypusForm } from '@/components/platypus-form'
import { createBrowserClient } from '@/lib/supabase/client'

export default function EditPlatypusPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [platypus, setPlatypus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const supabase = createBrowserClient()
    
    async function fetchPlatypus() {
      try {
        const { data, error: fetchError } = await supabase
          .from('platypuses')
          .select('*')
          .eq('id', id)
          .single()

        if (fetchError || !data) {
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

  const handleSubmit = async (data) => {
    const supabase = createBrowserClient()
    
    try {
      const { error: updateError } = await supabase
        .from('platypuses')
        .update(data)
        .eq('id', id)

      if (updateError) throw updateError

      navigate(`/platypus/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-12 bg-gray-100">
        <div className="text-center">
          <p className="text-3xl text-black">Loading...</p>
        </div>
      </div>
    )
  }

  if (notFound || !platypus) {
    return <Navigate to="/gallery" replace />
  }

  return (
    <div className="flex-1 p-12 bg-gray-100">
      <h1 className="text-5xl font-black border-4 border-black p-6 bg-white mb-8 inline-block">
        Edit {platypus.name}
      </h1>
      
      {error && (
        <div className="bg-red-500 border-4 border-black text-white p-4 mb-8 max-w-4xl">
          <p className="font-bold">Error: {error}</p>
        </div>
      )}

      <PlatypusForm initialData={platypus} onSubmit={handleSubmit} submitLabel="Update Platypus" />
    </div>
  )
}

