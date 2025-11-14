import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlatypusForm } from '@/components/platypus-form'
import { createBrowserClient } from '@/lib/supabase/client'

export function EditButton({ platypus }) {
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleUpdate = async (data) => {
    const supabase = createBrowserClient()
    
    try {
      const { error: updateError } = await supabase
        .from('platypuses')
        .update(data)
        .eq('id', platypus.id)

      if (updateError) throw updateError

      setIsEditing(false)
      navigate(0) // Refresh the page
    } catch (err) {
      setError(err.message)
    }
  }

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Edit Platypus</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-white text-black font-bold py-2 px-6 border-4 border-white hover:bg-black hover:text-white transition-none text-xl"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="bg-red-500 border-4 border-black text-white p-4 mb-8">
              <p className="font-bold">Error: {error}</p>
            </div>
          )}

          <PlatypusForm
            initialData={platypus}
            onSubmit={handleUpdate}
            submitLabel="Update Platypus"
          />
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="flex-1 bg-black text-white font-bold py-4 px-6 border-4 border-black hover:bg-white hover:text-black transition-none text-xl"
    >
      Edit Platypus
    </button>
  )
}
