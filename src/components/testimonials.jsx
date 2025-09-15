"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Phone } from "lucide-react"

const testimonials = [
  {
    "name": "Muzamil Rajper",
    "country": null,
    "visaType": "Study Visa",               // inferred from "WSL study visa team"
    "rating": 5,
    "image": null,
    "quote": "Ma'am Saba Riaz has been incredibly helpful and efficient in addressing all my queries. Her dedication, professionalism, and prompt responses make her an invaluable asset to the Pen Visa study visa team. Thank you for your exceptional support!",
    "location": null
  },
  {
    "name": "Zeeshan",
    "country": null,
    "visaType": null,
    "rating": 4.5,
    "image": null,
    "quote": "I think Pen Visa Consultancy is one of the best consultancy. I am very satisfied with Pen Visa services. I future I will recommend Pen Visa Consultancy to others.",
    "location": null
  },
  {
    "name": "Ors One",
    "country": null,
    "visaType": "Study Visa",               // inferred from "Your study visa..."
    "rating": 5,
    "image": null,
    "quote": "I had a very good experience with Pen Visa. They guided me in a very professional way. But I have an advice for all the students that never delay one the consultant completely. Your study visa is a result of collaborative effort of yourself.",
    "location": null
  },
  {
    "name": "Malik Shehzad Rajput",
    "country": "Italy",                     // inferred from "Italy student visa"
    "visaType": "Student Visa",             // inferred from "Italy student visa"
    "rating": 4.5,
    "image": null,
    "quote": "With the amazing help of Pen Visa consultant team, I was able to start my Italy student visa adventure with ease. My acceptance was made possible by Mam Hina's outstanding assistance and direction. I'm excited and grateful for the next...",
    "location": null
  },
  {
    "name": "Tehsin Hassan",
    "country": null,
    "visaType": null,
    "rating": 5,
    "image": null,
    "quote": "I had a great experience with Pen Visa consultants .madam Aqsa guided me through out the process professionaly and made things easier for me in every step.she remained cooperative and very professional with good behaviour also.i highly recommend Pen Visa consultants and mam Aqsa .",
    "location": null
  },
  {
    "name": "shaista sarwar",
    "country": null,
    "visaType": null,
    "rating": 5,
    "image": null,
    "quote": "Pen Visa Consultants are the best consultant. They are soo corporative in every step. Their support and guidance are too good and very informative.",
    "location": null
  }
]


export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  // Auto slide every 6s
  useEffect(() => {
    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startAuto = () => {
    stopAuto()
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((p) => (p + 1) % testimonials.length)
    }, 6000)
  }

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const next = () => {
    stopAuto()
    setCurrentIndex((p) => (p + 1) % testimonials.length)
    startAuto()
  }

  const prev = () => {
    stopAuto()
    setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length)
    startAuto()
  }

  // Return 3 items for desktop, centered starting at currentIndex
  const getVisible = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return visible
  }

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#0b6b4f] mb-10">Testimonials</h2>

        <div
          className="relative"
          onMouseEnter={() => stopAuto()}
          onMouseLeave={() => startAuto()}
        >
          {/* Desktop: show 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {getVisible().map((t, i) => (
              <Card
                key={`${t.name}-${i}-${currentIndex}`}
                className="rounded-2xl shadow-lg overflow-hidden py-0"
              >
                <CardContent className="p-10 bg-[#073f31] h-full text-white min-h-[360px] flex flex-col">
                  {/* Name */}
                  <h3 className="text-xl font-semibold text-center">{t.name}</h3>
                  <p className="text-sm text-center opacity-80 mb-4">{t.role}</p>

                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-5 w-5 ${si < t.rating ? "text-yellow-400 fill-current" : "text-white/40"}`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-center text-sm leading-relaxed mt-2 mb-6 flex-1">{t.quote}</p>

                  {/* optional footer (empty to keep layout aligned) */}
                  <div className="mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <Card className="rounded-2xl shadow-lg overflow-hidden py-0">
              <CardContent className="p-8 bg-[#073f31] h-full text-white">
                <h3 className="text-lg font-semibold text-center">{testimonials[currentIndex].name}</h3>
                <p className="text-sm text-center opacity-80 mb-4">{testimonials[currentIndex].role}</p>

                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`h-5 w-5 ${si < testimonials[currentIndex].rating ? "text-yellow-400 fill-current" : "text-white/40"}`}
                    />
                  ))}
                </div>

                <p className="text-center text-sm italic">"{testimonials[currentIndex].quote}"</p>
              </CardContent>
            </Card>
          </div>

          {/* Left / Right arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-20 bg-white rounded-full p-2 shadow-lg hover:scale-105 transition"
          >
            <ChevronLeft className="w-6 h-6 text-[#0b6b4f]" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-20 bg-white rounded-full p-2 shadow-lg hover:scale-105 transition"
          >
            <ChevronRight className="w-6 h-6 text-[#0b6b4f]" />
          </button>

          {/* Indicators (dots) */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="hidden md:block w-6 h-1 bg-slate-200 rounded-full" /> {/* spacer to match design */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => {
                // active logic: active when i === currentIndex (center)
                const isActive = i === currentIndex
                return (
                  <button
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => {
                      stopAuto()
                      setCurrentIndex(i)
                      startAuto()
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${isActive ? "bg-[#0b6b4f] scale-110" : "bg-slate-300"}`}
                  />
                )
              })}
            </div>
            <div className="hidden md:block w-6 h-1 bg-slate-200 rounded-full" /> {/* spacer to match design */}
          </div>
        </div>
      </div>

      {/* WhatsApp floating button (bottom-left) */}
      <a
        href="https://wa.me/92300XXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-6 bottom-6 z-50 flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 hover:scale-105 transition-transform"
        aria-label="Contact For Assessment"
      >
        <span className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm">
          <Phone className="w-6 h-6" />
        </span>
        <span className="text-sm font-medium text-slate-700">Contact For Assessment</span>
      </a>

      {/* Circular progress bottom-right */}
      {/* <div className="fixed right-6 bottom-6 z-40">
        <svg width="80" height="80" viewBox="0 0 36 36" className="block">
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ecf9ef" strokeWidth="2.5" />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke="#7ad146"
            strokeWidth="2.5"
            strokeDasharray="87 100"
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="6" fill="#0b6b4f" fontWeight="700">
            87%
          </text>
        </svg>
      </div> */}
    </section>
  )
}
