"use client"

export default function FilterPanel({ label, options, selected, setSelected }) {
  return (
    <div>
      <label className="block text-xl font-bold uppercase mb-4">{label}</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border-4 border-black p-4 text-lg uppercase bg-white focus:bg-black focus:text-white outline-none transition-colors cursor-pointer"
      >
        <option value="">ALL {label}S</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
