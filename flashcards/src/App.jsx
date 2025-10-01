import { useState } from "react"
import { FlashCard } from "./components/FlashCard.jsx"
import { cricketFlashcards } from "./lib/data.js"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cards, setCards] = useState(cricketFlashcards)

  const currentCard = cards[currentIndex]

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentIndex(0)
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Cricket Flashcards! 🏏</h1>
          <h4 className="text-xl md:text-xl  text-foreground">Lets test your knowledge in my favourite sport cricket!</h4>
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>

        <FlashCard key={currentIndex} question={currentCard.question} answer={currentCard.answer} category={currentCard.category} />

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="gap-2 bg-transparent border border-border px-4 py-2 rounded-md disabled:opacity-50 flex items-center"
          >
            ⬅️
            Previous
          </button>

          <button onClick={handleShuffle} className="gap-2 bg-secondary px-4 py-2 rounded-md flex items-center">
            Shuffle
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="gap-2 bg-transparent border border-border px-4 py-2 rounded-md disabled:opacity-50 flex items-center "
          >
            Next ➡️
          </button>
        </div>
      </div>
    </main>
  )
}
