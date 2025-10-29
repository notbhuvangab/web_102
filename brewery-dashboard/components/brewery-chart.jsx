"use client"

export default function BreweryChart({ breweries }) {
  // Count breweries by type
  const typeCounts = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || "unknown"
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)

  const maxCount = Math.max(...chartData.map((d) => d.count))

  return (
    <div className="border-4 border-black p-6 bg-white">
      <h3 className="text-2xl font-bold uppercase mb-6">BREWERY TYPES</h3>
      <div className="space-y-4">
        {chartData.map(({ type, count }) => {
          const percentage = (count / maxCount) * 100
          return (
            <div key={type}>
              <div className="flex justify-between mb-2 text-sm font-bold uppercase">
                <span>{type}</span>
                <span>{count}</span>
              </div>
              <div className="border-2 border-black h-8 bg-white">
                <div className="h-full bg-black transition-all duration-500" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
