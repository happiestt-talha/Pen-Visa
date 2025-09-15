import React from "react"
import { Suspense } from "react"
import "./globals.css"

// If you have the geist font package and it exports className/variable:
let geistSansClass = ""
let geistMonoClass = ""
try {
  // only attempt to require if package exists — avoid hard crash in dev if missing
  // (this dynamic require is optional — you can simply import at top if installed)
  // import { GeistSans } from "geist/font/sans"  // prefer static import if you installed it
  // import { GeistMono } from "geist/font/mono"
  // geistSansClass = GeistSans.className
  // geistMonoClass = GeistMono.className
} catch (e) { }

// import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Pen Visa - Expert Visa Consulting Services",
  description:
    "Professional visa consulting for Canada, Australia, US & more. Fast assessments, document preparation, and application support.",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSansClass} ${geistMonoClass} font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
