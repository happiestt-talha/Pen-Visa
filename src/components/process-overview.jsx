"use client"

import React, { useMemo } from "react"
import { Phone, CheckCircle } from "lucide-react"

/**
 * Props:
 *  - whatsappNumber: string (digits only or formatted; sanitised internally)
 *  - message: optional pre-filled message for WhatsApp chat
 *  - fallbackTel: boolean - if true and WhatsApp number invalid, show tel: fallback
 *  - className: extra classes for container wrapper if needed
 *
 * Behavior:
 *  - Sanitises once via useMemo.
 *  - Shows compact icon-only button on small screens; on md+ the label is visible and nicely animated.
 *  - Accessible (focus styles, aria-label) and motion-safe.
 */

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

/** sanitize phone to digits-only and basic length check */
function sanitizeE164(number) {
  if (!number) return null
  const digits = String(number).replace(/\D/g, "")
  if (digits.length >= 9 && digits.length <= 15) return digits
  return null
}

function buildWhatsAppUrl(numberDigits, message) {
  const base = `https://wa.me/${numberDigits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export default function ProcessOverview({
  whatsappNumber = "923218815888",
  message = "Hello! I would like an assessment for study abroad options.",
  fallbackTel = true,
  className = "",
}) {
  // compute once
  const { numberDigits, waUrl, telUrl } = useMemo(() => {
    const digits = sanitizeE164(whatsappNumber)
    const wa = digits ? buildWhatsAppUrl(digits, message) : null
    const tel = digits ? `tel:+${digits}` : null
    return { numberDigits: digits, waUrl: wa, telUrl: tel }
  }, [whatsappNumber, message])

  const contactHref = waUrl || (fallbackTel ? telUrl : null)
  const isWhatsApp = !!waUrl

  return (
    <section
      aria-label="Process Overview"
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: "url('/process-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-black/40 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-28">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-secondary">
            <span className="p-2 rounded-md bg-white shadow-sm">
              <CheckCircle className="h-4 w-4" />
            </span>
            <span className="uppercase tracking-wider">Process Overview</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-secondary">
            Unforgettable Getaways
            <br />
            <span className="block">Escaping Routine</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <article
              key={s.number}
              className="relative bg-white rounded-2xl shadow-xl p-8 md:p-10 min-h-[240px] flex flex-col justify-start"
            >
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

      {/* Improved floating contact */}
      {contactHref && (
        <a
          href={contactHref}
          target={isWhatsApp ? "_blank" : "_self"}
          rel={isWhatsApp ? "noopener noreferrer" : undefined}
          aria-label={
            isWhatsApp
              ? `Contact on WhatsApp: +${sanitizeE164(whatsappNumber)}`
              : telUrl
              ? `Call: +${sanitizeE164(whatsappNumber)}`
              : "Contact"
          }
          // wrapper: group used for hover/focus interactions
          className="group fixed left-6 bottom-6 z-50 flex items-center gap-3 rounded-full px-3 py-2
                     bg-white/70 backdrop-blur-md shadow-2xl dark:bg-black/60
                     hover:scale-105 transform-gpu transition-transform motion-safe:duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-300"
        >
          {/* icon circle */}
          <span
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm
                       bg-gradient-to-br from-green-400 to-green-600 text-white"
            aria-hidden
          >
            {/* keep Phone for clarity — swap for official WhatsApp SVG if desired */}
            <Phone className="w-5 h-5" />
          </span>

          {/* label: visible on md+ screens; on small screens expands on hover */}
          <span
            className="hidden md:inline-block text-sm font-medium text-slate-800 dark:text-slate-100
                       opacity-100 transform transition-all motion-safe:duration-200"
          >
            Contact For Assessment
          </span>

          {/* small-screen animated label (appears on hover/focus) */}
          <span
            className="md:hidden block text-sm font-medium text-slate-800 dark:text-slate-100
                       overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-[12rem] group-focus:max-w-[12rem]
                       opacity-0 group-hover:opacity-100 group-focus:opacity-100
                       transition-all motion-safe:duration-250 ease-out"
          >
            Contact For Assessment
          </span>

          {/* accessibility: announce number for screen readers */}
          <span className="sr-only">WhatsApp number: +{sanitizeE164(whatsappNumber)}</span>
        </a>
      )}
    </section>
  )
}
