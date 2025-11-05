import React, { useState } from 'react'
import Sidebar from '../../components/sidebar.jsx'

export default function AppLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? '' : ''}`}>
        {children}
      </main>
    </div>
  )
}

