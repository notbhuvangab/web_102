import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBrowserClient } from '@/lib/supabase/client'

export function DeleteButton({ id }) {
  const [isConfirming, setIsConfirming] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
    const supabase = createBrowserClient()
    
    try {
      const { error } = await supabase
        .from('platypuses')
        .delete()
        .eq('id', id)

      if (error) throw error

      navigate('/gallery')
    } catch (err) {
      alert('Error deleting platypus: ' + err.message)
    }
  }

  if (isConfirming) {
    return (
      <div className="flex-1 flex gap-2">
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white font-bold py-4 px-6 border-4 border-black hover:bg-red-700 transition-none text-xl"
        >
          Confirm Delete
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="flex-1 bg-white text-black font-bold py-4 px-6 border-4 border-black hover:bg-black hover:text-white transition-none text-xl"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="flex-1 bg-white text-black font-bold py-4 px-6 border-4 border-black hover:bg-red-600 hover:text-white transition-none text-xl"
    >
      Delete Platypus
    </button>
  )
}
