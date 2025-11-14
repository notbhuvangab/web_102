import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlatypusForm } from '@/components/platypus-form'
import { createBrowserClient } from '@/lib/supabase/client'

export default function CreatePage() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleSubmit = async (data) => {
    const supabase = createBrowserClient()
    
    try {
      const { error: insertError } = await supabase
        .from('platypuses')
        .insert([data])

      if (insertError) throw insertError

      navigate('/gallery')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen p-12">
      <h1 className="text-5xl font-bold text-black text-center mb-12">
        Create a New Platypus
      </h1>

      {error && (
        <div className="bg-red-500 border-4 border-black text-white p-4 mb-8 max-w-4xl mx-auto">
          <p className="font-bold">Error: {error}</p>
        </div>
      )}

      <PlatypusForm onSubmit={handleSubmit} submitLabel="Create Platypus" />
    </div>
  )
}

