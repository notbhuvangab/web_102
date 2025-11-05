import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function BreweryDetail() {
  const { id } = useParams()
  const [brewery, setBrewery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
        
        if (!response.ok) {
          throw new Error('Brewery not found')
        }
        
        const data = await response.json()
        setBrewery(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBrewery()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 border-8 border-black p-8 bg-white">LOADING...</div>
        </div>
      </div>
    )
  }

  if (error || !brewery) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="border-8 border-black p-12 bg-white">
            <p className="text-4xl font-bold uppercase mb-4">BREWERY NOT FOUND</p>
            <p className="text-xl uppercase mb-6">{error || 'The brewery you are looking for does not exist.'}</p>
            <Link
              to="/"
              className="inline-block border-4 border-black p-4 font-bold uppercase bg-black text-white hover:bg-white hover:text-black transition-colors"
            >
              BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const mapUrl = brewery.latitude && brewery.longitude
    ? `https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`
    : null

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-8 border-black bg-black text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold uppercase tracking-tight">{brewery.name}</h1>
            <p className="text-xl mt-2 uppercase tracking-wide">BREWERY DETAILS</p>
          </div>
          <Link
            to="/"
            className="border-4 border-white p-4 font-bold uppercase bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            ← BACK
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="border-4 border-black p-6 bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">BASIC INFORMATION</h2>
              <div className="space-y-3 text-sm uppercase">
                <p>
                  <span className="font-bold">TYPE:</span> {brewery.brewery_type || 'N/A'}
                </p>
                <p>
                  <span className="font-bold">COUNTRY:</span> {brewery.country || 'N/A'}
                </p>
                <p>
                  <span className="font-bold">STATE:</span> {brewery.state || 'N/A'}
                </p>
                <p>
                  <span className="font-bold">CITY:</span> {brewery.city || 'N/A'}
                </p>
                <p>
                  <span className="font-bold">POSTAL CODE:</span> {brewery.postal_code || 'N/A'}
                </p>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">ADDRESS</h2>
              <div className="space-y-3 text-sm uppercase">
                <p>
                  <span className="font-bold">STREET:</span> {brewery.street || 'N/A'}
                </p>
                {mapUrl && (
                  <p>
                    <span className="font-bold">COORDINATES:</span>{' '}
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      {brewery.latitude}, {brewery.longitude} (VIEW MAP)
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="border-4 border-black p-6 bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">CONTACT INFORMATION</h2>
              <div className="space-y-3 text-sm uppercase">
                {brewery.phone && (
                  <p>
                    <span className="font-bold">PHONE:</span>{' '}
                    <a href={`tel:${brewery.phone}`} className="underline hover:no-underline">
                      {brewery.phone}
                    </a>
                  </p>
                )}
                {brewery.website_url && (
                  <p>
                    <span className="font-bold">WEBSITE:</span>{' '}
                    <a
                      href={brewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline break-all"
                    >
                      {brewery.website_url}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">ADDITIONAL DETAILS</h2>
              <div className="space-y-3 text-sm uppercase">
                <p>
                  <span className="font-bold">BREWERY ID:</span> {brewery.id}
                </p>
                {brewery.updated_at && (
                  <p>
                    <span className="font-bold">LAST UPDATED:</span> {formatDate(brewery.updated_at)}
                  </p>
                )}
                {brewery.created_at && (
                  <p>
                    <span className="font-bold">CREATED:</span> {formatDate(brewery.created_at)}
                  </p>
                )}
              </div>
            </div>

            {mapUrl && (
              <div className="border-4 border-black p-6 bg-black text-white">
                <h2 className="text-2xl font-bold uppercase mb-4">LOCATION</h2>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-4 border-white p-4 font-bold uppercase text-center hover:bg-white hover:text-black transition-colors"
                >
                  VIEW ON MAP
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

