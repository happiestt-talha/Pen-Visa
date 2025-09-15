"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, Plane, FileCheck, Users, Clock } from "lucide-react"

const services = [
  {
    icon: <GraduationCap className="h-12 w-12" />,
    title: "Study Visa Services",
    description:
      "Complete assistance for student visas including university selection, application preparation, and visa processing.",
    features: [
      "University & Course Selection",
      "Application Documentation",
      "Visa Interview Preparation",
      "Post-arrival Support",
    ],
    price: "Starting from $299",
    popular: false,
    // Replace with your own images. These are sample Unsplash links.
    image: "/stdnt-visa.jpg",
  },
  {
    icon: <Briefcase className="h-12 w-12" />,
    title: "Skilled Worker Visa",
    description:
      "Expert guidance for skilled migration programs including Express Entry, SkillSelect, and employer-sponsored visas.",
    features: ["Skills Assessment", "Points Calculation", "Job Market Analysis", "Application Submission"],
    price: "Starting from $499",
    popular: true,
    image: "/skill-visa.jpg",
  },
  {
    icon: <Plane className="h-12 w-12" />,
    title: "Tourist & Visitor Visa",
    description: "Fast-track processing for tourist, business, and family visit visas with high approval rates.",
    features: ["Document Preparation", "Application Review", "Interview Coaching", "Quick Processing"],
    price: "Starting from $199",
    popular: false,
    image: "/travel-visa.jpg",
  },
]

export function ServicesOverview() {
  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Visa Services</h2>
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto text-balance">
            Comprehensive visa solutions tailored to your needs. From initial consultation to successful visa approval,
            we're with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up rounded-2xl ${service.popular ? "ring-2 ring-secondary" : ""
                }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background image (absolute) */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
                aria-hidden="true"
              />

              {/* Dark overlay to ensure text contrast. Hover increases darkness slightly. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/70 transition-all" />

              {/* Content sits above the image */}
              <div className="relative z-10">
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium shadow">Most Popular</span>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-6">
                  <div className="flex justify-center mb-4">
                    {/* Icon circle — slightly translucent so it reads on any background */}
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                      {/* keep the icon but force it to a visible color */}
                      {React.cloneElement(service.icon, { className: "h-12 w-12 text-white" })}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 text-white">
                  <p className="text-white/90 text-center">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <FileCheck className="h-5 w-5 text-white/90 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-2xl font-bold text-white mb-4">{service.price}</p>
                    <Button className={`w-full bg-white/10 text-white hover:bg-white/20`}>Get Started</Button>
                  </div> */}
                </CardContent>
              </div>

              {/* Decorative (visually-hidden) image label for screen readers */}
              <span className="sr-only">Background image for {service.title}</span>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-slide-in-left">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-secondary-foreground mb-2">5000+</h3>
            <p className="text-secondary-foreground">Successful Applications</p>
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-secondary-foreground mb-2">98%</h3>
            <p className="text-secondary-foreground">Success Rate</p>
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
            <div className="flex justify-center mb-4">
              <FileCheck className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-secondary-foreground mb-2">15+</h3>
            <p className="text-secondary-foreground">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}
