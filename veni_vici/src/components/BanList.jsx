"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

export default function BanList({ banList, onRemove }) {
  return (
    <Card className="p-6 bg-card border-4 border-border sticky top-8">
      <h2 className="text-xl font-bold mb-2 uppercase tracking-wider border-b-4 border-border pb-2">BAN LIST</h2>
      <p className="text-sm mb-4 uppercase tracking-wider font-bold">CLICK ATTRIBUTES TO BAN</p>

      <div className="space-y-3">
        {banList.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm uppercase tracking-wider">
            NO BANNED ATTRIBUTES
          </p>
        )}

        {banList.map((item, index) => (
          <div
            key={`${item.attribute}-${item.value}-${index}`}
            className="flex items-center justify-between bg-muted border-4 border-border p-3 group hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest font-bold">{item.attribute}</p>
              <p className="font-bold uppercase tracking-wider">{item.value}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.attribute, item.value)}
              className="h-8 w-8 p-0 border-2 border-border hover:bg-primary hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
