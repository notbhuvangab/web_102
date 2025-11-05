import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-8 border-black bg-black text-white p-8">
        <h1 className="text-5xl font-bold uppercase tracking-tight">ABOUT BREWERY HUB</h1>
      </header>

      <div className="max-w-[1200px] mx-auto p-8">
        <div className="space-y-8">
          <div className="border-4 border-black p-8 bg-white">
            <h2 className="text-3xl font-bold uppercase mb-6">ABOUT THIS APPLICATION</h2>
            <div className="space-y-4 text-base uppercase">
              <p>
                BREWERY HUB IS A COMPREHENSIVE DASHBOARD FOR EXPLORING BREWERIES AROUND THE WORLD. 
                THIS APPLICATION PROVIDES AN INTERACTIVE INTERFACE TO SEARCH, FILTER, AND DISCOVER 
                BREWERIES FROM VARIOUS LOCATIONS AND TYPES.
              </p>
              <p>
                THE APPLICATION FEATURES ADVANCED FILTERING CAPABILITIES, DATA VISUALIZATIONS, 
                AND DETAILED VIEWS FOR EACH BREWERY, ALL DESIGNED WITH A BRUTALIST AESTHETIC 
                THAT EMPHASIZES FUNCTIONALITY AND CLARITY.
              </p>
            </div>
          </div>

          <div className="border-4 border-black p-8 bg-white">
            <h2 className="text-3xl font-bold uppercase mb-6">DATA SOURCE</h2>
            <div className="space-y-4 text-base uppercase">
              <p>
                ALL BREWERY DATA IS PROVIDED BY THE{' '}
                <a
                  href="https://www.openbrewerydb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline font-bold"
                >
                  OPEN BREWERY DB
                </a>
                , A FREE AND OPEN DATASET OF BREWERIES.
              </p>
              <p>
                THE OPEN BREWERY DB API PROVIDES PUBLIC INFORMATION ABOUT BREWERIES INCLUDING 
                THEIR NAMES, TYPES, LOCATIONS, CONTACT INFORMATION, AND MORE. THIS DATA IS 
                AVAILABLE FOR PUBLIC USE AND INTEGRATION.
              </p>
            </div>
          </div>

          <div className="border-4 border-black p-8 bg-white">
            <h2 className="text-3xl font-bold uppercase mb-6">FEATURES</h2>
            <div className="space-y-4">
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold uppercase mb-2">SEARCH & FILTER</h3>
                <p className="text-sm uppercase">
                  SEARCH BREWERIES BY NAME, CITY, OR STATE. FILTER BY TYPE, STATE, COUNTRY, 
                  AND ADDITIONAL CRITERIA SUCH AS WEBSITE OR PHONE AVAILABILITY.
                </p>
              </div>
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold uppercase mb-2">DATA VISUALIZATIONS</h3>
                <p className="text-sm uppercase">
                  INTERACTIVE CHARTS SHOWING THE DISTRIBUTION OF BREWERY TYPES AND TOP STATES 
                  BY BREWERY COUNT. TOGGLE VISIBILITY TO FOCUS ON THE DATA THAT MATTERS TO YOU.
                </p>
              </div>
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold uppercase mb-2">DETAIL VIEWS</h3>
                <p className="text-sm uppercase">
                  CLICK ON ANY BREWERY TO VIEW COMPREHENSIVE DETAILS INCLUDING FULL ADDRESS, 
                  COORDINATES, CONTACT INFORMATION, AND DIRECT LINKS TO MAPS AND WEBSITES.
                </p>
              </div>
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold uppercase mb-2">SORTING</h3>
                <p className="text-sm uppercase">
                  SORT BREWERIES BY NAME (A-Z OR Z-A), CITY, OR TYPE TO ORGANIZE YOUR EXPLORATION.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="border-4 border-black p-8 bg-black text-white">
            <h2 className="text-3xl font-bold uppercase mb-6">TECHNICAL STACK</h2>
            <div className="space-y-2 text-base uppercase">
              <p><span className="font-bold">FRAMEWORK:</span> REACT</p>
              <p><span className="font-bold">ROUTING:</span> REACT ROUTER DOM</p>
              <p><span className="font-bold">CHARTS:</span> RECHARTS</p>
              <p><span className="font-bold">STYLING:</span> TAILWIND CSS</p>
              <p><span className="font-bold">API:</span> OPEN BREWERY DB</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

