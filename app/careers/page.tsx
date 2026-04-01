import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers - IdPlay',
  description: 'Join the IdPlay team and help build the future.',
};

const benefits = [
  'Competitive Salary & Equity',
  'Health, Dental & Vision Insurance',
  'Flexible Work Hours',
  'Remote Work Options',
  'Professional Development Budget',
  'Team Retreats & Events'
];

const openPositions = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Jakarta / Remote',
    type: 'Full-time'
  },
  {
    title: 'Backend Developer (Go/Node.js)',
    department: 'Engineering',
    location: 'Jakarta',
    type: 'Full-time'
  },
  {
    title: 'Product Designer (UI/UX)',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Sales Manager',
    department: 'Sales',
    location: 'Surabaya',
    type: 'Full-time'
  },
    {
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Bandung',
    type: 'Full-time'
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Build the Future with Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Join a team that is redefining how Indonesia connects to the internet. We are ambitious, innovative, and people-first.
          </p>
          <a href="#open-positions" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            View Open Roles
          </a>
        </div>
      </section>

      {/* Values / Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join IdPlay?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We care about our people as much as we care about our customers. Here are some of the perks of working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
          </div>

          <div className="space-y-4">
            {openPositions.map((job, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:items-center justify-between group">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.department}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.location}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
                  </div>
                </div>
                <button className="flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-gray-600">
               Don't see a role that fits? <a href="/contact" className="text-orange-500 font-semibold hover:underline">Contact us</a> anyway.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}
