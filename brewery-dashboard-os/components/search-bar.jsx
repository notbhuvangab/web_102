"use client"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-8">
      <label className="block text-xl font-bold uppercase mb-4">SEARCH BREWERIES</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="SEARCH BY NAME, CITY, OR STATE..."
        className="w-full border-4 border-black p-4 text-lg uppercase bg-white focus:bg-black focus:text-white outline-none transition-colors"
      />
    </div>
  )
}
