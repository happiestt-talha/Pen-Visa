"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, Phone, Mail } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        {/* <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>info@penvisa.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            <span>Registered in Pakistan & UAE</span>
          </div>
        </div> */}

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src="/visa-logo.jpg" alt="Pen Visa Logo" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h1 className="text-xl font-bold text-secondary">Pen Visa</h1>
              <p className="text-xs text-muted-foreground">Expert Visa Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-secondary transition-colors">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-secondary transition-colors">
              Services
            </a>
            <a href="#countries" className="text-foreground hover:text-secondary transition-colors">
              Countries
            </a>
            <a href="#about" className="text-foreground hover:text-secondary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-secondary transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex bg-transparent">
              Free Assessment
            </Button>
            {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Apply Now</Button> */}

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-foreground hover:text-secondary transition-colors">
                Home
              </a>
              <a href="#services" className="text-foreground hover:text-secondary transition-colors">
                Services
              </a>
              <a href="#countries" className="text-foreground hover:text-secondary transition-colors">
                Countries
              </a>
              <a href="#about" className="text-foreground hover:text-secondary transition-colors">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-secondary transition-colors">
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
