import { useState } from 'react'
import { PerryAvatar } from './perry-avatar'

export function PlatypusForm({ initialData = null, onSubmit, submitLabel }) {
  const [name, setName] = useState(initialData?.name || '')
  const [speed, setSpeed] = useState(initialData?.speed || '')
  const [color, setColor] = useState(initialData?.color || 'teal')

  const colors = [
    'teal',
    'red',
    'green',
    'blue',
    'purple',
    'yellow',
    'orange',
    'pink',
    'cyan',
    'lime',
    'magenta',
    'brown',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ 
      name, 
      speed: parseFloat(speed), 
      color,
      tail_length: 5,  // Default value
      bill_size: 5     // Default value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <PerryAvatar color={color} size={180} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Name Input */}
        <div className="bg-zinc-400 border-4 border-black p-6">
          <label className="block font-bold text-black mb-4 text-xl">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter platypus name"
            required
            className="w-full bg-white border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-0"
          />
        </div>

        {/* Speed Input */}
        <div className="bg-zinc-400 border-4 border-black p-6">
          <label className="block font-bold text-black mb-4 text-xl">
            Speed (mph):
          </label>
          <input
            type="number"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="Enter speed"
            required
            min="0"
            max="10"
            className="w-full bg-white border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-0"
          />
        </div>

        {/* Color Selection */}
        <div className="bg-zinc-400 border-4 border-black p-6">
          <label className="block font-bold text-black mb-4 text-xl">
            Color:
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {colors.map((c) => (
              <label
                key={c}
                className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 border-2 border-transparent hover:border-black"
              >
                <input
                  type="radio"
                  name="color"
                  value={c}
                  checked={color === c}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-5 h-5"
                />
                <span className="font-bold capitalize">{c}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white font-bold py-4 px-8 border-4 border-black hover:bg-white hover:text-black transition-none text-xl"
      >
        {submitLabel}
      </button>
    </form>
  )
}
