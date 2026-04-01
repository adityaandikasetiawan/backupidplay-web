'use client';

import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="bg-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Whether you're interested in our services, need technical support, or just want to say hello, we'd love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Office Location</h3>
                    <p className="text-gray-600">
                      Jl. Mampang Prapatan Raya No. 123<br />
                      Jakarta Selatan, 12790<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:support@idplay.co.id" className="hover:text-orange-500 transition-colors">support@idplay.co.id</a> (Support)<br />
                      <a href="mailto:sales@idplay.co.id" className="hover:text-orange-500 transition-colors">sales@idplay.co.id</a> (Sales)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+622112345678" className="hover:text-orange-500 transition-colors">+62 21 1234 5678</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Mon - Fri, 09:00 - 18:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <Input id="name" placeholder="Your name" required className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" type="email" placeholder="Your email" required className="bg-gray-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <Input id="subject" placeholder="What is this regarding?" required className="bg-gray-50" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="flex w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us how we can help..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
