import React from 'react'
import { Link } from 'react-router-dom'

export default function BreweryCard({ brewery }) {
  return (
    <div className="border-4 border-black p-6 bg-white hover:bg-black hover:text-white transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-bold uppercase mb-2 break-words">
            <Link
              to={`/brewery/${brewery.id}`}
              className="hover:underline"
            >
              {brewery.name}
            </Link>
          </h2>
          <div className="space-y-1 text-sm uppercase">
            <p>
              <span className="font-bold">TYPE:</span> {brewery.brewery_type || "N/A"}
            </p>
            <p>
              <span className="font-bold">CITY:</span> {brewery.city || "N/A"}
            </p>
            <p>
              <span className="font-bold">STATE:</span> {brewery.state || "N/A"}
            </p>
            <p>
              <span className="font-bold">COUNTRY:</span> {brewery.country || "N/A"}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-1 text-sm uppercase">
          <p>
            <span className="font-bold">ADDRESS:</span> {brewery.street || "N/A"}
          </p>
          <p>
            <span className="font-bold">POSTAL:</span> {brewery.postal_code || "N/A"}
          </p>
          <p>
            <span className="font-bold">PHONE:</span> {brewery.phone || "N/A"}
          </p>
          {brewery.website_url && (
            <p>
              <span className="font-bold">WEBSITE:</span>{" "}
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                VISIT
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
