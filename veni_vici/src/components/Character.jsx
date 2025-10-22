"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Character({
  currentCharacter,
  loading,
  error,
  onDiscover,
  onAttributeClick,
  isInBanList,
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-7xl font-black mb-4 uppercase tracking-tighter leading-none">
          RICK & MORTY
          <br />
          <span className="text-6xl">CHARACTER FINDER</span>
        </h1>
        <p className="text-xl uppercase tracking-wider mb-6 font-bold">
          DISCOVER CHARACTERS FROM ACROSS THE MULTIVERSE
        </p>
        <div className="flex justify-center gap-4 mb-6 text-4xl">
          <span>▲</span>
          <span>■</span>
          <span>●</span>
          <span>◆</span>
          <span>▼</span>
        </div>
      </div>

      <Card className="p-8 bg-card border-4 border-border">
        {!currentCharacter && !error && (
          <div className="text-center py-16">
            <p className="text-2xl uppercase tracking-wider mb-8 font-bold">READY TO EXPLORE THE MULTIVERSE?</p>
            <Button
              onClick={onDiscover}
              disabled={loading}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-8 uppercase tracking-wider border-4 border-border hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              {loading ? "OPENING PORTAL..." : ">>> DISCOVER <<<"}
            </Button>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive mb-4 uppercase tracking-wider font-bold border-4 border-destructive p-4">
              {error}
            </p>
            <Button
              onClick={onDiscover}
              disabled={loading}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider border-4 border-border"
            >
              TRY AGAIN
            </Button>
          </div>
        )}

        {currentCharacter && (
          <div className="space-y-6">
            <div className="border-4 border-primary">
              <img
                src={currentCharacter.image || "/placeholder.svg"}
                alt={currentCharacter.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-black mb-6 uppercase tracking-wider border-4 border-border p-4 bg-secondary">
                {currentCharacter.name}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-widest font-bold">STATUS</p>
                  <Badge
                    onClick={() => onAttributeClick("status", currentCharacter.status)}
                    className={`cursor-pointer text-lg px-4 py-2 uppercase tracking-wider font-bold border-4 border-border hover:translate-x-1 hover:translate-y-1 transition-transform ${
                      isInBanList("status", currentCharacter.status)
                        ? "bg-destructive text-destructive-foreground line-through"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {currentCharacter.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-widest font-bold">SPECIES</p>
                  <Badge
                    onClick={() => onAttributeClick("species", currentCharacter.species)}
                    className={`cursor-pointer text-lg px-4 py-2 uppercase tracking-wider font-bold border-4 border-border hover:translate-x-1 hover:translate-y-1 transition-transform ${
                      isInBanList("species", currentCharacter.species)
                        ? "bg-destructive text-destructive-foreground line-through"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {currentCharacter.species}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-widest font-bold">GENDER</p>
                  <Badge
                    onClick={() => onAttributeClick("gender", currentCharacter.gender)}
                    className={`cursor-pointer text-lg px-4 py-2 uppercase tracking-wider font-bold border-4 border-border hover:translate-x-1 hover:translate-y-1 transition-transform ${
                      isInBanList("gender", currentCharacter.gender)
                        ? "bg-destructive text-destructive-foreground line-through"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {currentCharacter.gender}
                  </Badge>
                </div>

                {currentCharacter.type && (
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-widest font-bold">TYPE</p>
                    <Badge
                      onClick={() => onAttributeClick("type", currentCharacter.type)}
                      className={`cursor-pointer text-lg px-4 py-2 uppercase tracking-wider font-bold border-4 border-border hover:translate-x-1 hover:translate-y-1 transition-transform ${
                        isInBanList("type", currentCharacter.type)
                          ? "bg-destructive text-destructive-foreground line-through"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {currentCharacter.type}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={onDiscover}
              disabled={loading}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-8 uppercase tracking-wider border-4 border-border hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              {loading ? "OPENING PORTAL..." : ">>> DISCOVER NEXT <<<"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
