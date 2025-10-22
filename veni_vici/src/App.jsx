"use client"

import { useState } from "react"
import History from "./components/History.jsx"
import Character from "./components/Character.jsx"
import BanList from "./components/BanList.jsx"

export default function Home() {
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [history, setHistory] = useState([])
  const [banList, setBanList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRandomCharacter = async () => {
    setLoading(true)
    setError(null)

    let attempts = 0
    const maxAttempts = 50

    while (attempts < maxAttempts) {
      try {
        const randomId = Math.floor(Math.random() * 826) + 1
        const response = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`)

        if (!response.ok) {
          attempts++
          continue
        }

        const data = await response.json()

        const isBanned = banList.some((ban) => {
          if (ban.attribute === "gender") return data.gender === ban.value
          if (ban.attribute === "species") return data.species === ban.value
          if (ban.attribute === "status") return data.status === ban.value
          if (ban.attribute === "type") return data.type === ban.value
          return false
        })

        if (!isBanned) {
          setCurrentCharacter(data)
          setHistory((prev) => [data, ...prev])
          setLoading(false)
          return
        }

        attempts++
      } catch (err) {
        attempts++
      }
    }

    setError("COULD NOT FIND A CHARACTER MATCHING YOUR CRITERIA. TRY REMOVING SOME BAN LIST ITEMS.")
    setLoading(false)
  }

  const addToBanList = (attribute, value) => {
    if (!value || value === "unknown" || value === "") return

    const exists = banList.some((item) => item.attribute === attribute && item.value === value)

    if (!exists) {
      setBanList((prev) => [...prev, { attribute, value }])
    }
  }

  const removeFromBanList = (attribute, value) => {
    setBanList((prev) => prev.filter((item) => !(item.attribute === attribute && item.value === value)))
  }

  const isInBanList = (attribute, value) => {
    return banList.some((item) => item.attribute === attribute && item.value === value)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <History history={history} />
          </div>

          <div className="lg:col-span-6">
            <Character
              currentCharacter={currentCharacter}
              loading={loading}
              error={error}
              onDiscover={fetchRandomCharacter}
              onAttributeClick={addToBanList}
              isInBanList={isInBanList}
            />
          </div>

          <div className="lg:col-span-3">
            <BanList banList={banList} onRemove={removeFromBanList} />
          </div>
        </div>
      </div>
    </div>
  )
}
