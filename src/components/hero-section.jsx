"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle, Users, Award } from "lucide-react"

const heroSlides = [
  {
    title: "Your Gateway to Canada",
    subtitle: "Expert guidance for Express Entry, Provincial Nominee Programs, and Study Permits",
    image: "/hero-canada.jpg",
    country: "Canada",
  },
  {
    title: "Australia Awaits You",
    subtitle: "Skilled migration, student visas, and family reunification programs",
    image: "/hero-australia.jpg",
    country: "Australia",
  },
  {
    title: "American Dream Realized",
    subtitle: "H1B, L1, student visas, and permanent residency pathways",
    image: "/hero-usa.jpg",
    country: "USA",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)
  const isHovering = useRef(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const textContainerRef = useRef(null)

  // Preload images for better performance
  useEffect(() => {
    heroSlides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Memoized functions to prevent unnecessary re-renders
  const startAuto = useCallback(() => {
    stopAuto()
    intervalRef.current = window.setInterval(() => {
      if (!isHovering.current) {
        setCurrent((c) => (c + 1) % heroSlides.length)
      }
    }, 5000)
  }, [heroSlides.length])

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const goTo = useCallback((i) => {
    setCurrent((i + heroSlides.length) % heroSlides.length)
  }, [heroSlides.length])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)
  }, [heroSlides.length])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length)
  }, [heroSlides.length])

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      next()
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prev()
    }
  }

  // autoplay
  useEffect(() => {
    startAuto()

    // keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Home") goTo(0)
      if (e.key === "End") goTo(heroSlides.length - 1)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      stopAuto()
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [startAuto, stopAuto, prev, next, goTo, heroSlides.length])

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative h-screen min-h-[640px] overflow-hidden"
      onMouseEnter={() => {
        isHovering.current = true
      }}
      onMouseLeave={() => {
        isHovering.current = false
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides (background images) */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => {
          const active = i === current
          return (
            <div
              key={slide.country + i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out will-change-opacity ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              aria-hidden={!active}
            >
              <div
                className={`absolute inset-0 bg-center bg-cover transform transition-transform duration-12000 ${active ? "scale-105" : "scale-100"}`}
                style={{
                  filter: "contrast(0.92) saturate(0.95)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${slide.image})`,
                }}
                aria-label={`${slide.country} landscape`}
                role="img"
              />
              {/* gradient overlay for better contrast */}
              <div className={`absolute inset-0 pointer-events-none ${active ? "bg-gradient-to-b from-black/30 via-black/12 to-white/6" : "bg-black/40"}`} />
            </div>
          )
        })}
      </div>

      {/* decorative top-left accent */}
      <svg className="absolute left-0 top-0 w-full max-w-[520px] opacity-10 pointer-events-none" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 120 C150 40 300 200 600 50 L600 0 L0 0 Z" fill="currentColor" className="text-emerald-800" />
      </svg>

      {/* Main content panel (glass) */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div
            // className="bg-white/35 dark:bg-black/50 backdrop-blur-md rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border border-white/40"
            className="bg-white/50 rounded-md dark:bg-black/50 p-8 sm:p-10 md:p-12 shadow-2xl border border-white/40"
            role="region"
            aria-labelledby="hero-heading"
          >
            {/* Country pill + slide controls */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="inline-flex items-center gap-3">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium text-sm shadow-sm">
                  {heroSlides[current].country}
                </span>
                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-lime-400" />
                  <span>Trusted since 2016</span>
                </div>
              </div>

              {/* small slide thumbnails for quick jump on larger screens */}
              <div className="hidden sm:flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to ${heroSlides[idx].country} slide`}
                    aria-current={idx === current ? "true" : "false"}
                    className={`w-2 h-2 rounded-full transition-all ${idx === current ? "bg-emerald-700 scale-110" : "bg-slate-300 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </div>

            {/* Main headline + subtitle with fade transition */}
            <div ref={textContainerRef} className="min-h-[180px] md:min-h-[220px]">
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-900 leading-tight transition-opacity duration-700"
                key={`title-${current}`}
              >
                {heroSlides[current].title}
              </h1>

              <p
                className="mt-4 text-sm sm:text-base md:text-lg text-slate-800 max-w-3xl mx-auto transition-opacity duration-700 delay-150"
                key={`subtitle-${current}`}
              >
                {heroSlides[current].subtitle}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 transform-gpu hover:-translate-y-0.5 transition focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                onClick={() => {
                  const el = document.getElementById("contact")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Start Your Application
              </Button>

              {/* <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-emerald-800 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                onClick={() => {
                  const el = document.getElementById("eligibility")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Free Eligibility Check
              </Button> */}
            </div>

            {/* trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-700" />
                <span className="text-slate-800">5,000+ Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                <span className="text-slate-800">Experienced Consultants</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-700" />
                <span className="text-slate-800">98% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Accent small cards under the main panel (visible on md+) */}
          <div className="hidden md:flex justify-center gap-6 mt-8">
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 px-4 py-3 rounded-xl shadow">
              <div className="text-xs text-slate-600">Free Assessment</div>
              <div className="font-semibold text-emerald-800">Start in 10 mins</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 px-4 py-3 rounded-xl shadow">
              <div className="text-xs text-slate-600">Visa Types</div>
              <div className="font-semibold text-emerald-800">Study • Work • Family</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 px-4 py-3 rounded-xl shadow">
              <div className="text-xs text-slate-600">Trusted Advisors</div>
              <div className="font-semibold text-emerald-800">Certified team</div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel navigation buttons */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-emerald-900 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-emerald-900 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* small bottom centered dots for tiny screens */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:hidden">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to ${heroSlides[idx].country} slide`}
            aria-current={idx === current ? "true" : "false"}
            className={`w-3 h-3 rounded-full transition-colors ${idx === current ? "bg-emerald-700" : "bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  )
}