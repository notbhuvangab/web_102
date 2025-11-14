import { Routes, Route } from 'react-router-dom'
import { Navigation } from '@/components/navigation'
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import GalleryPage from './pages/GalleryPage'
import PlatypusDetailPage from './pages/PlatypusDetailPage'
import EditPlatypusPage from './pages/EditPlatypusPage'

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/platypus/:id" element={<PlatypusDetailPage />} />
          <Route path="/platypus/:id/edit" element={<EditPlatypusPage />} />
        </Routes>
      </main>
    </div>
  )
}

