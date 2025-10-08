import { useState, useEffect } from "react"
import { FlashCard } from "./components/FlashCard.jsx"
import { cricketFlashcards } from "./lib/data.js"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cards, setCards] = useState(cricketFlashcards)
  const [masteredCards, setMasteredCards] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [userGuess, setUserGuess] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const activeCards = cards.filter(card => !masteredCards.includes(card.id))
  const currentCard = activeCards[currentIndex]

  useEffect(() => {
    if (currentStreak > longestStreak) {
      setLongestStreak(currentStreak)
    }
  }, [currentStreak, longestStreak])

  const resetCardState = () => {
    setUserGuess("")
    setShowAnswer(false)
    setFeedback(null)
  }

  const handleNext = () => {
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      resetCardState()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      resetCardState()
    }
  }

  const handleShuffle = () => {
    const shuffled = [...activeCards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentIndex(0)
    resetCardState()
  }

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const extractKeyTokens = (answer) => {
    const normalized = normalizeAnswer(answer)
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'not', 'out', 'per', 'team'
    ])
    
    return normalized.split(' ')
      .filter(token => token.length > 0 && !stopWords.has(token))
      .filter(token => token.length > 1 || /^\d+$/.test(token))
  }

  const tokenizeUserInput = (input) => {
    const normalized = normalizeAnswer(input)
    return normalized.split(' ').filter(token => token.length > 0)
  }

  const calculateMatchScore = (userTokens, keyTokens) => {
    if (keyTokens.length === 0) return 0
    
    let matchCount = 0
    
    for (const keyToken of keyTokens) {
      const hasMatch = userTokens.some(userToken => {
        return userToken.includes(keyToken) || keyToken.includes(userToken)
      })
      
      if (hasMatch) {
        matchCount++
      }
    }
    
    return matchCount / keyTokens.length
  }

  const checkAnswer = () => {
    if (!userGuess.trim()) return
    
    const keyTokens = extractKeyTokens(currentCard.answer)
    const userTokens = tokenizeUserInput(userGuess)
    
    const matchScore = calculateMatchScore(userTokens, keyTokens)
    const isCorrect = matchScore >= 0.2
    
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    setShowAnswer(true)
    
    if (isCorrect) {
      setCurrentStreak(prev => prev + 1)
    } else {
      setCurrentStreak(0)
    }
  }

  const handleMasterCard = () => {
    if (currentCard && !masteredCards.includes(currentCard.id)) {
      setMasteredCards(prev => [...prev, currentCard.id])
      if (currentIndex < activeCards.length - 1) {
        handleNext()
      } else if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        resetCardState()
      }
    }
  }
  if (!currentCard) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">🎉 Congratulations! 🎉</h1>
          <p className="text-xl text-foreground">You've mastered all the cricket flashcards!</p>
          <div className="space-y-2">
            <p className="text-muted-foreground">Longest Streak: <span className="font-bold text-accent">{longestStreak}</span></p>
            <button 
              onClick={() => {
                setMasteredCards([])
                setCards(cricketFlashcards)
                setCurrentIndex(0)
                setCurrentStreak(0)
                resetCardState()
              }}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Cricket Quiz! 🏏</h1>
          <h4 className="text-xl md:text-xl text-foreground">Test your cricket knowledge with our quiz!</h4>
          <div className="flex justify-center items-center gap-6 text-sm">
            <p className="text-muted-foreground">
              Card {currentIndex + 1} of {activeCards.length}
            </p>
            <div className="flex gap-4">
              <span className="text-accent">Current Streak: <strong>{currentStreak}</strong></span>
              <span className="text-primary">Best Streak: <strong>{longestStreak}</strong></span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto space-y-4">
          <FlashCard 
            key={currentIndex} 
            question={currentCard.question} 
            answer={currentCard.answer} 
            category={currentCard.category}
            showAnswer={showAnswer}
            feedback={feedback}
          />

          {!showAnswer && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  placeholder="Enter your answer..."
                  className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={checkAnswer}
                  disabled={!userGuess.trim()}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {showAnswer && (
            <div className="space-y-4">
              <div className={`p-4 rounded-md text-center font-semibold ${
                feedback === 'correct' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {feedback === 'correct' ? '✅ Correct!' : '❌ Incorrect!'}
              </div>
              
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleMasterCard}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
                >
                  Mark as Mastered
                </button>
                <button
                  onClick={resetCardState}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="gap-2 bg-transparent border border-border px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:bg-secondary/50 transition-colors"
          >
            ⬅️ Previous
          </button>

          <button 
            onClick={handleShuffle} 
            className="gap-2 bg-secondary px-4 py-2 rounded-md flex items-center hover:bg-secondary/90 transition-colors"
          >
            🔀 Shuffle
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === activeCards.length - 1}
            className="gap-2 bg-transparent border border-border px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center hover:bg-secondary/50 transition-colors"
          >
            Next ➡️
          </button>
        </div>

        {masteredCards.length > 0 && (
          <div className="text-center">
            <p className="text-muted-foreground">
              🎯 Mastered Cards: <span className="font-bold text-accent">{masteredCards.length}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
