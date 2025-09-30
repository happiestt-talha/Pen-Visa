"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { CheckCircle, Send } from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function ContactFormRedesign() {
  const [option, setOption] = useState("sayhi");
  const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    visaType: "",
    message: "",
    consent: false,
  };
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);

  function handleInputChange(field, value) {
    setFormData((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.consent) return;
    setIsLoading(true);

    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("message", formData.message);
      fd.append("option", option);
      if (formData.phone) fd.append("phone", formData.phone);
      if (formData.country) fd.append("country", formData.country);
      if (formData.visaType) fd.append("visaType", formData.visaType);

      // Attach files (multiple allowed)
      const files = fileRef.current?.files;
      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          fd.append("attachments", files[i]);
        }
      }

      await axios.post("/api/contact", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      });

      setIsSubmitted(true);
      setFormData(initialForm);
      if (fileRef.current) fileRef.current.value = "";
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Send failed:", err);
      // show user-friendly message
      alert("Failed to send message. Check server logs for details.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover py-16 relative"
      style={{ backgroundImage: `url('/hero-canada.jpg')` }}
    >
      {/* translucent overlay */}
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 w-full max-w-2xl mx-6 md:mx-0 rounded-2xl overflow-hidden">
        <Card className="text-white rounded-2xl p-10 md:p-14 shadow-2xl bg-gradient-to-tr from-[#4e6996ff] to-[#2f6ee380]">
          <div className="p-0">
            <h1 className="text-center font-extrabold text-4xl md:text-5xl tracking-wide mb-8 text-white">CONTACT US</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-start gap-8 mb-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="contactOption"
                    value="sayhi"
                    checked={option === "sayhi"}
                    onChange={() => setOption("sayhi")}
                    className="w-5 h-5 accent-white bg-transparent border-white/70"
                  />
                  <span className="text-lg font-medium text-white">Say Hi</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="contactOption"
                    value="quote"
                    checked={option === "quote"}
                    onChange={() => setOption("quote")}
                    className="w-5 h-5 accent-white bg-transparent border-white/70"
                  />
                  <span className="text-lg font-medium text-white">Get a Quote</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="sr-only">Full name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="bg-transparent placeholder:text-white border-b border-white/20 focus:border-white/50 text-white caret-white placeholder-white/80"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-transparent placeholder:text-white border-b border-white/20 focus:border-white/50 text-white caret-white placeholder-white/80"
                  />
                </div>
              </div>

              {option === "quote" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-transparent placeholder:text-white border-b border-white/20 focus:border-white/50 text-white caret-white placeholder-white/80"
                    />

                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      value={formData.country}
                      onValueChange={(val) => handleInputChange("country", val)}
                    >
                      <SelectTrigger className="bg-white/60 placeholder:text-white border border-white/30 text-white focus:border-white/50">
                        <SelectValue
                          placeholder="Country of Interest"
                          className="text-white data-[placeholder]:text-white"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-transparent backdrop-blur-sm text-white">
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>



                    <Select
                      value={formData.visaType}
                      onValueChange={(val) => handleInputChange("visaType", val)}
                    >
                      <SelectTrigger className="bg-white/60 border border-white/30 text-white focus:border-white/50">
                        <SelectValue
                          placeholder="Select visa type"
                          className="text-white data-[placeholder]:text-white/80"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-transparent backdrop-blur-sm text-white">
                        <SelectItem value="study">Study Visa</SelectItem>
                        <SelectItem value="work">Work Visa</SelectItem>
                        <SelectItem value="tourist">Tourist Visa</SelectItem>
                      </SelectContent>
                    </Select>


                  </div>
                  <div className="rounded-md p-4 text-sm border-2 border-dashed border-white/25 text-white">
                    <p className="mb-2">Upload documents (optional)</p>
                    <input
                      ref={fileRef}
                      name="attachments"
                      type="file"
                      accept=".pdf,image/*"
                      className="text-sm text-white"
                      multiple
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="message" className="sr-only">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-transparent placeholder:text-white border-b border-white/20 focus:border-white/50 text-white placeholder-white/80"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleInputChange("consent", !!checked)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm leading-relaxed text-white">
                  I agree to be contacted regarding my enquiry and accept the <a className="underline">Privacy Policy</a>.
                </label>
              </div>

              <Button
                type="submit"
                disabled={!formData.consent || isLoading}
                className={`${formData.consent ? "bg-white text-[#1F4FA8]" : "bg-white/60 text-[#1F4FA8]/60 cursor-not-allowed"} inline-flex items-center gap-3 px-6 py-3 rounded-md text-sm font-semibold`}
              >
                <Send className="h-4 w-4" />
                {isLoading ? "Sending..." : "Submit"}
              </Button>
            </form>

            {isSubmitted && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-white/95 rounded-xl p-8 w-full max-w-md text-center shadow-2xl">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-700">Thank you — we'll get back to you soon.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}