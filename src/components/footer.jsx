"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/visa-logo.jpg" alt="Pen Visa Logo" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h3 className="text-xl font-bold">Pen Visa</h3>
                <p className="text-sm opacity-80">Expert Visa Solutions</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted partner for visa consulting services worldwide. Registered and licensed in Pakistan and UAE
              with over 15 years of experience.
            </p>
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-secondary bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-secondary bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-secondary bg-transparent"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-secondary bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="opacity-80 hover:opacity-100 transition-opacity">
                  Services
                </a>
              </li>
              <li>
                <a href="#countries" className="opacity-80 hover:opacity-100 transition-opacity">
                  Countries
                </a>
              </li>
              <li>
                <a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Study Visa
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Work Visa
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Skilled Migration
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Tourist Visa
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Family Reunion
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Business Visa
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Document Translation
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Interview Preparation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-80" />
                <span className="opacity-80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="opacity-80">info@penvisa.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 opacity-80 mt-0.5" />
                <div className="opacity-80">
                  <p>Pakistan Office:</p>
                  <p>Lahore, Punjab</p>
                  <p className="mt-1">UAE Office:</p>
                  <p>Dubai, UAE</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <p className="text-xs opacity-80 mb-3">Get visa updates and tips</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
          <div className="flex flex-col md:flex-row gap-4">
            <p>&copy; {new Date().getFullYear()} Pen Visa. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p>Reg. Pakistan: #ABC123456</p>
            <p>Reg. UAE: #DEF789012</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
