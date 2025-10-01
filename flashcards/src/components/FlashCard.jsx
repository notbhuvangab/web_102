"use client"

import { useState } from "react"

const cn = (...classes) => classes.filter(Boolean).join(" ")

export function FlashCard({ question, answer, category }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showBatAnimation, setShowBatAnimation] = useState(false)

  const handleFlip = () => {
    if (!isFlipped) {
      // Flipping to answer - show bat animation
      setShowBatAnimation(true)
      setTimeout(() => setShowBatAnimation(false), 600)
    }
    setIsFlipped(!isFlipped)
  }

  const textClass = category === "rule" ? "text-rule" : "text-fun"
  const badgeClass = category === "rule" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
  const bgClass = category === "rule" ? "bg-rule" : "bg-fun"

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto relative">
      {showBatAnimation && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          <div
            className="absolute left-1/4 top-1/2 -translate-y-1/2"
            style={{
              animation: "batSwing 0.6s ease-out",
            }}
          >
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
              {/* Bat handle - cylindrical grip */}
              <rect x="42" y="5" width="16" height="35" rx="8" fill="#654321" />
              {/* Rubber grip texture */}
              <rect x="42" y="8" width="16" height="3" fill="#4a3319" opacity="0.5" />
              <rect x="42" y="14" width="16" height="3" fill="#4a3319" opacity="0.5" />
              <rect x="42" y="20" width="16" height="3" fill="#4a3319" opacity="0.5" />
              <rect x="42" y="26" width="16" height="3" fill="#4a3319" opacity="0.5" />
              <rect x="42" y="32" width="16" height="3" fill="#4a3319" opacity="0.5" />

              {/* Bat shoulder - transition from handle to blade */}
              <path d="M 42 40 L 30 50 L 30 110 L 70 110 L 70 50 L 58 40 Z" fill="#D2691E" />

              {/* Bat blade - flat rectangular face */}
              <rect x="32" y="50" width="36" height="60" rx="2" fill="#DEB887" />

              {/* Sweet spot - darker center of blade */}
              <rect x="38" y="65" width="24" height="30" rx="1" fill="#D2691E" opacity="0.3" />

              {/* Wood grain lines */}
              <line x1="40" y1="55" x2="40" y2="105" stroke="#C19A6B" strokeWidth="1" opacity="0.4" />
              <line x1="50" y1="55" x2="50" y2="105" stroke="#C19A6B" strokeWidth="1" opacity="0.4" />
              <line x1="60" y1="55" x2="60" y2="105" stroke="#C19A6B" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          <div
            className="absolute left-1/4 top-1/2 -translate-y-1/2"
            style={{
              animation: "ballFly 0.6s ease-out",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              {/* Ball shadow/shading */}
              <defs>
                <radialGradient id="ballGradient">
                  <stop offset="0%" stopColor="#FF4444" />
                  <stop offset="70%" stopColor="#CC0000" />
                  <stop offset="100%" stopColor="#990000" />
                </radialGradient>
              </defs>

              {/* Main ball */}
              <circle cx="20" cy="20" r="18" fill="url(#ballGradient)" />

              {/* Cricket ball seam - characteristic stitching */}
              <path d="M 10 12 Q 20 15 30 12" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 10 28 Q 20 25 30 28" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Seam stitching details */}
              <line x1="12" y1="12" x2="12" y2="28" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
              <line x1="28" y1="12" x2="28" y2="28" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />

              {/* Cross stitches on seam */}
              <line x1="14" y1="14" x2="16" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="14" y1="16" x2="16" y2="14" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="18" y1="18" x2="20" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="18" y1="20" x2="20" y2="18" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="22" y1="18" x2="24" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="22" y1="20" x2="24" y2="18" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="26" y1="14" x2="28" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="26" y1="16" x2="28" y2="14" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

              <line x1="14" y1="24" x2="16" y2="26" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="14" y1="26" x2="16" y2="24" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="18" y1="22" x2="20" y2="24" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="18" y1="24" x2="20" y2="22" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="22" y1="22" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="22" y1="24" x2="24" y2="22" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="26" y1="24" x2="28" y2="26" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
              <line x1="26" y1="26" x2="28" y2="24" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative w-full h-[400px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer",
          isFlipped && "[transform:rotateY(180deg)]",
        )}
        onClick={handleFlip}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-8",
            bgClass,
            "border-2 shadow-lg hover:shadow-xl transition-shadow",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-4">
            <span className={cn("inline-block px-4 py-1 rounded-full text-sm font-semibold", badgeClass)}>
              {category === "rule" ? "📋 Rule" : "🏏 Fun Fact"}
            </span>
          </div>
          <h2 className={cn("text-2xl md:text-3xl font-bold text-center text-balance mb-6", textClass)}>{question}</h2>
          <p className="text-muted-foreground text-sm">Click to reveal answer</p>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-8",
            bgClass,
            "border-2 shadow-lg hover:shadow-xl transition-shadow",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-4">
            <span className={cn("inline-block px-4 py-1 rounded-full text-sm font-semibold", badgeClass)}>
              Answer
            </span>
          </div>
          <p className={cn("text-xl md:text-2xl font-semibold text-center text-balance leading-relaxed", textClass)}>
            {answer}
          </p>
          <p className="text-foreground/70 text-sm mt-6">Click to flip back</p>
        </div>
      </div>

      <style>{`
        @keyframes batSwing {
          0% { transform: translate(-100px, 0) rotate(-45deg); opacity: 0; }
          30% { opacity: 1; }
          50% { transform: translate(0, 0) rotate(20deg); }
          100% { transform: translate(100px, -50px) rotate(45deg); opacity: 0; }
        }
        @keyframes ballFly {
          0% { transform: translate(-80px, 0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          40% { transform: translate(0, 0) scale(1); }
          60% { transform: translate(100px, -100px) scale(0.7) rotate(360deg); }
          100% { transform: translate(250px, -200px) scale(0.3) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
