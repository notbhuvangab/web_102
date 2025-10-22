"use client"

import { Card } from "@/components/ui/card"

export default function History({ history }) {
  return (
    <Card className="p-6 bg-card border-4 border-border sticky top-8">
      <h2 className="text-xl font-bold mb-4 uppercase tracking-wider border-b-4 border-border pb-2">
        WHO HAVE WE SEEN SO FAR?
      </h2>
      <div className="grid grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
        {history.map((char, index) => (
          <div
            key={`${char.id}-${index}`}
            className="aspect-square border-4 border-border hover:border-8 transition-all hover:scale-95"
          >
            <img
              src={char.image || "/placeholder.svg"}
              alt={char.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {history.length === 0 && (
          <div className="col-span-3 text-center text-muted-foreground py-8 uppercase text-sm tracking-wider">
            NO CHARACTERS DISCOVERED YET
          </div>
        )}
      </div>
    </Card>
  )
}
