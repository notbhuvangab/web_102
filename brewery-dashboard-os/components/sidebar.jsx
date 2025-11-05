import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  return (
    <nav
      className={`border-r-4 border-black bg-white min-h-screen transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } flex flex-col`}
    >
      {/* Header with Logo and Toggle */}
      <div className="border-b-4 border-black p-4">
        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-3' : 'justify-between'}`}>
          <div className={`flex items-center ${isCollapsed ? 'flex-col' : 'gap-3'}`}>
            {/* <img
              src="/placeholder-logo.svg"
              alt="Brewery Hub Logo"
              className="w-10 h-10 border-2 border-black"
            /> */}
            {!isCollapsed && (
              <span className="font-bold uppercase text-sm whitespace-nowrap">Brewery-HUB</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="border-4 border-black p-2 font-bold uppercase bg-black text-white hover:bg-white hover:text-black transition-colors w-10 flex"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block border-4 border-black p-4 font-bold uppercase transition-colors text-center ${
              isActive
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-black hover:text-white'
            } ${isCollapsed ? 'text-xs' : ''}`
          }
          title="Dashboard"
        >
          {isCollapsed ? 'D' : 'DASHBOARD'}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block border-4 border-black p-4 font-bold uppercase transition-colors text-center ${
              isActive
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-black hover:text-white'
            } ${isCollapsed ? 'text-xs' : ''}`
          }
          title="About"
        >
          {isCollapsed ? 'A' : 'ABOUT'}
        </NavLink>
      </div>
    </nav>
  )
}

