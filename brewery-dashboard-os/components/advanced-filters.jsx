"use client"

export default function AdvancedFilters({
  sortBy,
  setSortBy,
  hasWebsite,
  setHasWebsite,
  hasPhone,
  setHasPhone,
  onClearAll,
}) {
  return (
    <div className="border-4 border-black p-6 mb-8 bg-white">
      <h3 className="text-2xl font-bold uppercase mb-6">ADVANCED FILTERS</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2">SORT BY</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border-4 border-black p-3 uppercase bg-white focus:bg-black focus:text-white outline-none transition-colors cursor-pointer"
          >
            <option value="">DEFAULT</option>
            <option value="name-asc">NAME (A-Z)</option>
            <option value="name-desc">NAME (Z-A)</option>
            <option value="city-asc">CITY (A-Z)</option>
            <option value="type">TYPE</option>
          </select>
        </div>

        {/* Has Website */}
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasWebsite}
              onChange={(e) => setHasWebsite(e.target.checked)}
              className="w-6 h-6 border-4 border-black mr-3 cursor-pointer"
            />
            <span className="text-sm font-bold uppercase">HAS WEBSITE</span>
          </label>
        </div>

        {/* Has Phone */}
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasPhone}
              onChange={(e) => setHasPhone(e.target.checked)}
              className="w-6 h-6 border-4 border-black mr-3 cursor-pointer"
            />
            <span className="text-sm font-bold uppercase">HAS PHONE</span>
          </label>
        </div>

        {/* Clear All */}
        <div className="flex items-end">
          <button
            onClick={onClearAll}
            className="w-full border-4 border-black p-3 font-bold uppercase bg-black text-white hover:bg-white hover:text-black transition-colors"
          >
            CLEAR ALL
          </button>
        </div>
      </div>
    </div>
  )
}
