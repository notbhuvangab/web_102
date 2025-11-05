import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TopStatesPieChart({ breweries }) {
  // Count by state
  const stateCounts = breweries.reduce((acc, brewery) => {
    const state = brewery.state || 'Unknown'
    acc[state] = (acc[state] || 0) + 1
    return acc
  }, {})

  const topStates = Object.entries(stateCounts)
    .map(([state, count]) => ({ name: state, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  // Brutalist color palette - grayscale variations
  const COLORS = [
    '#000000', // Black
    '#1a1a1a', // Very dark gray
    '#333333', // Dark gray
    '#4d4d4d', // Medium dark gray
    '#666666', // Medium gray
    '#808080', // Gray
    '#999999', // Light gray
    '#b3b3b3', // Lighter gray
    '#cccccc', // Very light gray
    '#e6e6e6', // Almost white
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border-4 border-black p-4 bg-white">
          <p className="font-bold uppercase text-sm">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 border-2 border-black"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs font-bold uppercase">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
//     const RADIAN = Math.PI / 180
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5
//     const x = cx + radius * Math.cos(-midAngle * RADIAN)
//     const y = cy + radius * Math.sin(-midAngle * RADIAN)

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="#000"
//         textAnchor={x > cx ? 'start' : 'end'}
//         dominantBaseline="central"
//         fontSize={12}
//         fontWeight="bold"
//         className="uppercase"
//       >
//         {`${name}: ${(percent * 100).toFixed(0)}%`}
//       </text>
//     )
//   }

  return (
    <div className="border-4 border-black p-6 bg-white">
      <h3 className="text-2xl font-bold uppercase mb-6">TOP STATES BY BREWERY COUNT</h3>
      <ResponsiveContainer width="100%" height={330}>
        <PieChart>
          <Pie
            data={topStates}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#000"
            dataKey="value"
            stroke="#000"
            strokeWidth={2}
          >
            {topStates.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

