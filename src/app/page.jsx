import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CountrySelector } from "@/components/country-selector"
import { ServicesOverview } from "@/components/services-overview"
import ProcessOverview from "@/components/process-overview"
import { Testimonials } from "@/components/testimonials"
import { ApplicationForm } from "@/components/application-form"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CountrySelector />
      <ServicesOverview />
      <ProcessOverview />
      <Testimonials />
      <ApplicationForm />
      <Footer />
    </main>
  )
}
