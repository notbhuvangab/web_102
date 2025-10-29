"use client"

export default function LocationStats({ breweries }) {
  // Count by state
  const stateCounts = breweries.reduce((acc, brewery) => {
    const state = brewery.state || "Unknown"
    acc[state] = (acc[state] || 0) + 1
    return acc
  }, {})

  const topStates = Object.entries(stateCounts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Count by country
  const countryCounts = breweries.reduce((acc, brewery) => {
    const country = brewery.country || "Unknown"
    acc[country] = (acc[country] || 0) + 1
    return acc
  }, {})

  const topCountries = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="border-4 border-black p-6 bg-white">
      <h3 className="text-2xl font-bold uppercase mb-6">TOP LOCATIONS</h3>

      <div className="mb-6">
        <h4 className="text-lg font-bold uppercase mb-3 border-b-2 border-black pb-2">TOP 5 STATES</h4>
        <div className="space-y-2">
          {topStates.map(({ state, count }, index) => (
            <div key={state} className="flex justify-between text-sm uppercase">
              <span className="font-bold">
                {index + 1}. {state}
              </span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold uppercase mb-3 border-b-2 border-black pb-2">TOP 5 COUNTRIES</h4>
        <div className="space-y-2">
          {topCountries.map(({ country, count }, index) => (
            <div key={country} className="flex justify-between text-sm uppercase">
              <span className="font-bold">
                {index + 1}. {country}
              </span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
