import { Link } from 'react-router-dom'
import { PerryAvatar } from './perry-avatar'

export function PlatypusCard({ platypus }) {
  // Map color to border color
  const borderColors = {
    teal: 'border-teal-500',
    red: 'border-red-500',
    green: 'border-green-500',
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    yellow: 'border-yellow-400',
    orange: 'border-orange-500',
    pink: 'border-pink-500',
    cyan: 'border-cyan-500',
    lime: 'border-lime-500',
    magenta: 'border-fuchsia-500',
    brown: 'border-amber-700',
  }

  return (
    <div className={`bg-zinc-400 border-4 border-black p-8 ${borderColors[platypus.color] || 'border-teal-500'}`}>
      <div className="flex justify-center mb-6">
        <PerryAvatar color={platypus.color} size={120} />
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-black">Name:</span>
          <span className="bg-white px-2 py-1 border-2 border-black font-mono">
            {platypus.name}
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-black">Speed:</span>
          <span className="bg-white px-2 py-1 border-2 border-black font-mono">
            {platypus.speed} mph
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-black">Color:</span>
          <span className="bg-white px-2 py-1 border-2 border-black font-mono capitalize">
            {platypus.color}
          </span>
        </div>
      </div>
      
      <Link
        to={`/platypus/${platypus.id}`}
        className="block w-full bg-black text-white font-bold py-3 px-4 border-4 border-black hover:bg-white hover:text-black transition-none text-center"
      >
        View Details
      </Link>
    </div>
  )
}
