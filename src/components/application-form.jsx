"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUp, Send, CheckCircle } from "lucide-react"

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    visaType: "",
    message: "",
    consent: false,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-secondary mb-4">Application Submitted Successfully!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for choosing Pen Visa. Our expert consultants will review your application and contact
                you within 24 hours (working days) to discuss the next steps.
              </p>
              <p className="text-sm text-muted-foreground">
                Application ID: #GVP{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Start Your Application</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Take the first step towards your visa application. Fill out our quick form and get personalized guidance
            from our expert consultants.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-secondary">Free Consultation & Assessment</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country of Interest *</Label>
                  <Select onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                      <SelectItem value="australia">🇦🇺 Australia</SelectItem>
                      <SelectItem value="usa">🇺🇸 United States</SelectItem>
                      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                      <SelectItem value="germany">🇩🇪 Germany</SelectItem>
                      <SelectItem value="newzealand">🇳🇿 New Zealand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visaType">Visa Type *</Label>
                <Select onValueChange={(value) => handleInputChange("visaType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="study">Study Visa</SelectItem>
                    <SelectItem value="work">Work Visa</SelectItem>
                    <SelectItem value="skilled">Skilled Migration</SelectItem>
                    <SelectItem value="tourist">Tourist/Visitor Visa</SelectItem>
                    <SelectItem value="family">Family Reunion</SelectItem>
                    <SelectItem value="business">Business Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your goals (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Share your immigration goals, timeline, or any specific questions..."
                  rows={4}
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Upload Documents (Optional)</h4>
                <p className="text-muted-foreground mb-4">
                  Upload your passport, CV, or any relevant documents to help us assess your case better.
                </p>
                <Button variant="outline" type="button">
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleInputChange("consent", checked)}
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I authorize Pen Visa to contact me regarding my visa application and agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                  .
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!formData.consent}
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
