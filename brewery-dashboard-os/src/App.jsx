import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BreweryDetail from './pages/BreweryDetail.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/brewery/:id" element={<BreweryDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AppLayout>
  )
}
