"use client"

import React from "react"
import { Phone, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Study Abroad Options",
    description:
      "Explore diverse international study programs tailored for Pakistani students, ensuring a brighter future.",
  },
  {
    number: "02",
    title: "Visa & Application Guidance",
    description:
      "Receive expert assistance in navigating visa procedures and completing your university application process smoothly.",
  },
  {
    number: "03",
    title: "Scholarship Opportunities",
    description:
      "Discover scholarships and financial aid options available to help ease the cost of studying abroad.",
  },
]

export default function ProcessOverview() {
  return (
    <section
      aria-label="Process Overview"
      className="relative overflow-hidden"
      style={{
        // background image stored at /public/process-bg.webp
        backgroundImage: "url('/process-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* subtle overlay so text is readable on any background */}
      <div className="absolute inset-0 bg-white/85 dark:bg-black/40 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-28">
        {/* small header icon + label */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-secondary">
            <span className="p-2 rounded-md bg-white shadow-sm">
              <CheckCircle className="h-4 w-4" />
            </span>
            <span className="uppercase tracking-wider">Process Overview</span>
          </div>
        </div>

        {/* large title */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#0b6b4f]"> */}
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-secondary">
            Unforgettable Getaways
            <br />
            <span className="block">Escaping Routine</span>
          </h1>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <article
              key={s.number}
              className="relative bg-white rounded-2xl shadow-xl p-8 md:p-10 min-h-[240px] flex flex-col justify-start"
            >
              {/* small green dot accent (like the design) */}
              {/* {idx === 0 && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-lime-500 shadow-md" />
              )} */}

              {/* large outlined number like design (transparent fill, stroked outline) */}
              <div
                aria-hidden
                className="absolute -top-6 left-6 select-none pointer-events-none"
                style={{
                  WebkitTextStroke: "2px #034833",
                  color: "transparent",
                  fontSize: "3.25rem",
                  lineHeight: 1,
                  fontWeight: 800,
                }}
              >
                {s.number}
              </div>

              <h3 className="text-lg font-semibold text-secondary mt-6">{s.title}</h3>

              <p className="mt-4 text-sm text-slate-600 flex-1">{s.description}</p>
            </article>
          ))}
        </div>
      </div>

      {/* floating WhatsApp contact button bottom-left */}
      <a
        href="https://wa.me/92300XXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-6 bottom-6 z-50 flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 hover:scale-105 transition-transform"
        aria-label="Contact for Assessment on WhatsApp"
      >
        <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm">
          <Phone className="w-5 h-5" />
        </span>
        <span className="text-sm font-medium text-slate-700">Contact For Assessment</span>
      </a>

      {/* circular progress bottom-right */}
      {/* <div className="fixed right-6 bottom-6 z-40">
        <svg width="72" height="72" viewBox="0 0 36 36" className="block">
          <defs />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke="#e6f6ef"
            strokeWidth="2.5"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke="secondary"
            strokeWidth="2.5"
            strokeDasharray="77 100"
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="7"
            fill="secondary"
            fontWeight="700"
          >
            77%
          </text>
        </svg>
      </div>  */}
    </section>
  )
}
