"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, GraduationCap, Briefcase, Plane } from "lucide-react"

const countries = [
  {
    name: "Australia",
    flag: "🇦🇺",
    processingTime: "3-6 months",
    visaTypes: ["Study"],
    image: "/country-australia.jpg",
    description: "Pakistani students can study bachelor's and master's degree programs with and without IELTS",
  },
  {
    name: "USA",
    flag: "🇺🇸",
    processingTime: "4-8 months",
    visaTypes: ["Study", "Work"],
    image: "/country-usa.jpg",
    description: "USA is the birthplace of many musicians, artists, scientists, performers, painters, and writers",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    processingTime: "2-4 months",
    visaTypes: ["Study", "Work"],
    image: "/country-germany.jpg",
    description: "Affordable, high-quality education in the heart of Europe, with degrees recognized worldwide",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    processingTime: "6-12 months",
    visaTypes: ["Study", "Work", "PR"],
    image: "/country-canada.jpg",
    description: "Dream of every student - World's 4th most popular choice for international students",
  },
  {
    name: "Europe",
    flag: "🇪🇺",
    processingTime: "6-12 months",
    visaTypes: ["Study", "Work", "PR"],
    image: "/country-europe.jpg",
    description: "Europe is the birthplace of many musicians, artists, scientists, performers, painters, and writers",
  },
  {
    name: "New Zealand",
    flag: "NZ",
    processingTime: "6-12 months",
    visaTypes: ["Study", "Work", "PR"],
    image: "/country-newzealand.jpg",
    description: "New Zealand is the birthplace of many musicians, artists, scientists, performers, painters, and writers",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    processingTime: "6-12 months",
    visaTypes: ["Study", "Work", "PR"],
    image: "/country-uk.jpg",
    description: "United Kingdom is the birthplace of many musicians, artists, scientists, performers, painters, and writers",
  },
]

const getVisaIcon = (type) => {
  switch (type) {
    case "Study":
    case "Student":
      return <GraduationCap className="h-4 w-4" />
    case "Work":
    case "Skilled":
    case "H1B":
    case "L1":
      return <Briefcase className="h-4 w-4" />
    case "PR":
      return <Plane className="h-4 w-4" />
    default:
      return <Plane className="h-4 w-4" />
  }
}

export function CountrySelector() {
  return (
    <section id="countries" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0b6b4f] mb-4">
            Seeking Adventure
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-[#0b6b4f]/80 mb-6">
            Thrills and Excitement Await
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore world-class education opportunities in these amazing destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countries.map((country, index) => (
            <div
              key={country.name}
              className="group flex p-5 rounded-2xl overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative rounded-2xl flex-1 h-48 overflow-hidden">
                <img
                  src={country.image || "/placeholder.svg"}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="text-3xl">{country.flag}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">Study In {country.name}</h3>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-[#0b6b4f] font-medium">
                    <Clock className="h-3 w-3 mr-1" />
                    {country.processingTime}
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex-1">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{country.description}</p>
                <div className="flex flex-wrap gap-2">
                  {country.visaTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className="bg-[#0b6b4f]/10 text-[#0b6b4f] border-[#0b6b4f]/10 flex items-center gap-1 px-3 py-1"
                    >
                      {getVisaIcon(type)}
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}