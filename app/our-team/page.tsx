import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Team - IdPlay',
  description: 'Meet the dedicated team behind IdPlay.',
};

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Chief Executive Officer',
    image: '/images/team/placeholder-1.jpg', // Placeholder
    bio: 'Sarah leads IdPlay with over 15 years of experience in telecommunications and digital innovation.'
  },
  {
    name: 'David Chen',
    role: 'Chief Technology Officer',
    image: '/images/team/placeholder-2.jpg', // Placeholder
    bio: 'David oversees our technical strategy, ensuring our infrastructure is robust, scalable, and cutting-edge.'
  },
  {
    name: 'Amanda Williams',
    role: 'Head of Marketing',
    image: '/images/team/placeholder-3.jpg', // Placeholder
    bio: 'Amanda drives our brand growth and customer engagement strategies across all channels.'
  },
  {
    name: 'Michael Brown',
    role: 'Head of Customer Success',
    image: '/images/team/placeholder-4.jpg', // Placeholder
    bio: 'Michael is dedicated to ensuring our customers have the best possible experience with our services.'
  },
   {
    name: 'Jessica Lee',
    role: 'Product Manager',
    image: '/images/team/placeholder-5.jpg', // Placeholder
    bio: 'Jessica manages our product roadmap, translating user needs into innovative features.'
  },
   {
    name: 'Robert Wilson',
    role: 'Lead Developer',
    image: '/images/team/placeholder-6.jpg', // Placeholder
    bio: 'Robert leads our development team in building high-quality, reliable software solutions.'
  }
];

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are a group of passionate individuals dedicated to connecting Indonesia through innovative internet solutions.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="h-64 bg-gray-200 relative">
                   {/* Placeholder for image - using a colored div if image fails or for now */}
                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                      <span className="text-6xl">👤</span>
                   </div>
                   {/* 
                   <Image 
                     src={member.image} 
                     alt={member.name}
                     fill
                     className="object-cover"
                   />
                   */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to join our team?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people to help us build the future of connectivity.
          </p>
          <a 
            href="/careers" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
