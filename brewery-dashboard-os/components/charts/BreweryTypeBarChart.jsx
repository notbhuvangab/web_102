import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function BreweryTypeBarChart({ breweries }) {
  // Count breweries by type
  const typeCounts = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(typeCounts)
    .map(([type, count]) => ({ type: type.toUpperCase(), count }))
    .sort((a, b) => b.count - a.count)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border-4 border-black p-4 bg-white">
          <p className="font-bold uppercase text-sm">
            {payload[0].payload.type}: {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="border-4 border-black p-6 bg-white">
      <h3 className="text-2xl font-bold uppercase mb-6">BREWERY TYPES DISTRIBUTION</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <XAxis
            dataKey="type"
            stroke="#000"
            tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#000"
            tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#000" stroke="#000" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

