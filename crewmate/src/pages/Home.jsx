import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold text-black mb-8">
          Welcome to the Platypus Creator!
        </h1>
        
        <p className="text-2xl text-black mb-12 leading-relaxed">
          Create your own team of secret agent platypuses! Customize their colors, speed, and names. Build an unstoppable team of semi-aquatic egg-laying mammals!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/create"
            className="bg-white text-black font-bold py-4 px-8 border-4 border-black hover:bg-black hover:text-white transition-none text-xl"
          >
            Create a Platypus
          </Link>
          
          <Link
            to="/gallery"
            className="bg-black text-white font-bold py-4 px-8 border-4 border-white hover:bg-white hover:text-black transition-none text-xl"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}

