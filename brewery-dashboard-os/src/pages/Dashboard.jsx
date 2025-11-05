import React, { useState, useEffect } from "react"
import BreweryCard from "../../components/brewery-card.jsx"
import StatsCard from "../../components/stats-card.jsx"
import SearchBar from "../../components/search-bar.jsx"
import FilterPanel from "../../components/filter-panel.jsx"
import AdvancedFilters from "../../components/advanced-filters.jsx"
import BreweryTypeBarChart from "../../components/charts/BreweryTypeBarChart.jsx"
import TopStatesPieChart from "../../components/charts/TopStatesPieChart.jsx"

export default function Dashboard() {
  const [breweries, setBreweries] = useState([])
  const [filteredBreweries, setFilteredBreweries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [hasWebsite, setHasWebsite] = useState(false)
  const [hasPhone, setHasPhone] = useState(false)
  const [showCharts, setShowCharts] = useState(true)

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=100")
        const data = await response.json()
        setBreweries(data)
        setFilteredBreweries(data)
        console.log("[v0] Fetched breweries:", data.length)
      } catch (error) {
        console.error("Error fetching breweries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBreweries()
  }, [])

  useEffect(() => {
    let filtered = [...breweries]

    if (searchQuery) {
      filtered = filtered.filter(
        (brewery) =>
          brewery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brewery.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brewery.state?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }


    if (selectedType) {
      filtered = filtered.filter((brewery) => brewery.brewery_type === selectedType)
    }


    if (selectedState) {
      filtered = filtered.filter((brewery) => brewery.state === selectedState)
    }


    if (selectedCountry) {
      filtered = filtered.filter((brewery) => brewery.country === selectedCountry)
    }


    if (hasWebsite) {
      filtered = filtered.filter((brewery) => brewery.website_url)
    }


    if (hasPhone) {
      filtered = filtered.filter((brewery) => brewery.phone)
    }

    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "city-asc") {
      filtered.sort((a, b) => (a.city || "").localeCompare(b.city || ""))
    } else if (sortBy === "type") {
      filtered.sort((a, b) => (a.brewery_type || "").localeCompare(b.brewery_type || ""))
    }

    setFilteredBreweries(filtered)
  }, [searchQuery, selectedType, selectedState, selectedCountry, sortBy, hasWebsite, hasPhone, breweries])

  const totalBreweries = breweries.length
  const uniqueTypes = [...new Set(breweries.map((b) => b.brewery_type))].length
  const uniqueStates = [...new Set(breweries.map((b) => b.state).filter(Boolean))].length
  const uniqueCountries = [...new Set(breweries.map((b) => b.country).filter(Boolean))].length
  const withWebsite = breweries.filter((b) => b.website_url).length
  const withPhone = breweries.filter((b) => b.phone).length


  const types = [...new Set(breweries.map((b) => b.brewery_type).filter(Boolean))]
  const states = [...new Set(breweries.map((b) => b.state).filter(Boolean))].sort()
  const countries = [...new Set(breweries.map((b) => b.country).filter(Boolean))].sort()

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedType("")
    setSelectedState("")
    setSelectedCountry("")
    setSortBy("")
    setHasWebsite(false)
    setHasPhone(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 border-8 border-black p-8 bg-white">LOADING...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <header className="border-b-8 border-black bg-black text-white p-8">
        <h1 className="text-5xl font-bold uppercase tracking-tight">BREWERY HUB</h1>
        <p className="text-xl mt-2 uppercase tracking-wide">EXPLORE {totalBreweries} BREWERIES WORLDWIDE</p>
      </header>

      <div className="max-w-[1600px] mx-auto p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard label="TOTAL BREWERIES" value={totalBreweries} />
          <StatsCard label="BREWERY TYPES" value={uniqueTypes} />
          <StatsCard label="STATES" value={uniqueStates} />
          <StatsCard label="COUNTRIES" value={uniqueCountries} />
          <StatsCard label="WITH WEBSITE" value={withWebsite} />
          <StatsCard label="WITH PHONE" value={withPhone} />
        </div>

        {/* Chart Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="border-4 border-black p-4 font-bold uppercase bg-black text-white hover:bg-white hover:text-black transition-colors"
          >
            {showCharts ? "HIDE CHARTS" : "SHOW CHARTS"}
          </button>
        </div>

        {/* Charts Section */}
        {showCharts && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <BreweryTypeBarChart breweries={breweries} />
              <TopStatesPieChart breweries={breweries} />
            </div>
            <div className="border-4 border-black p-6 mb-8 bg-white">
              <h3 className="text-2xl font-bold uppercase mb-4">DATA INSIGHTS</h3>
              <div className="space-y-2 text-sm uppercase">
                <p><span className="font-bold">BREWERY TYPES:</span> The bar chart above shows the distribution of different brewery types in our dataset. Microbreweries and brewpubs are among the most common types.</p>
                <p><span className="font-bold">TOP STATES:</span> The pie chart displays the states with the highest concentration of breweries. Use the filters below to explore specific regions.</p>
              </div>
            </div>
          </>
        )}

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <FilterPanel label="BREWERY TYPE" options={types} selected={selectedType} setSelected={setSelectedType} />
          <FilterPanel label="STATE" options={states} selected={selectedState} setSelected={setSelectedState} />
          <FilterPanel
            label="COUNTRY"
            options={countries}
            selected={selectedCountry}
            setSelected={setSelectedCountry}
          />
        </div>

        <AdvancedFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          hasWebsite={hasWebsite}
          setHasWebsite={setHasWebsite}
          hasPhone={hasPhone}
          setHasPhone={setHasPhone}
          onClearAll={handleClearFilters}
        />

        {/* Results Count */}
        <div className="border-4 border-black p-4 mb-6 bg-black text-white">
          <p className="text-xl font-bold uppercase">
            SHOWING {filteredBreweries.length} OF {totalBreweries} BREWERIES
          </p>
        </div>

        {/* Brewery List */}
        <div className="space-y-4">
          {filteredBreweries.length === 0 ? (
            <div className="border-8 border-black p-12 text-center bg-white">
              <p className="text-3xl font-bold uppercase">NO BREWERIES FOUND</p>
              <p className="text-xl mt-4 uppercase">TRY ADJUSTING YOUR FILTERS</p>
            </div>
          ) : (
            filteredBreweries.map((brewery) => <BreweryCard key={brewery.id} brewery={brewery} />)
          )}
        </div>
      </div>
    </div>
  )
}

