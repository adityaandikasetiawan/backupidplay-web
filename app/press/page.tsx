import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Download, Newspaper, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Press & Media - IdPlay',
  description: 'Press releases, media kits, and company news for IdPlay.',
};

const pressReleases = [
  {
    date: 'October 24, 2024',
    title: 'IdPlay Expands Fiber Network to 5 New Cities in East Java',
    excerpt: 'We are proud to announce a major infrastructure expansion bringing high-speed internet to over 500,000 new households.',
    link: '/news/press-release-expansion'
  },
  {
    date: 'September 10, 2024',
    title: 'IdPlay Partners with Local Communities to Bridge the Digital Divide',
    excerpt: 'A new CSR initiative aimed at providing free internet access to schools and community centers in rural areas.',
    link: '/news/csr-initiative'
  },
  {
    date: 'August 05, 2024',
    title: 'Introducing "IdPlay Ultra": The Fastest Home Internet in the Region',
    excerpt: 'Launching our new 1Gbps plan designed for power users, gamers, and smart homes.',
    link: '/news/idplay-ultra-launch'
  }
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Newsroom</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Latest updates, press releases, and resources for the media.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Press Releases */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Newspaper className="mr-3 w-6 h-6 text-orange-500" />
                  Press Releases
                </h2>
                <Link href="/news" className="text-orange-500 font-medium hover:underline">
                  View all news
                </Link>
              </div>

              <div className="space-y-8">
                {pressReleases.map((release, index) => (
                  <div key={index} className="group block">
                    <span className="text-sm text-gray-400 mb-2 block">{release.date}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                      <Link href={release.link}>{release.title}</Link>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {release.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Media Kit & Contact */}
            <div className="lg:col-span-1 space-y-10">
              
              {/* Media Kit Widget */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Media Kit</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Download our official logos, brand guidelines, and executive headshots.
                </p>
                <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download Assets (ZIP)
                </button>
              </div>

              {/* Press Contact Widget */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Media Contact</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  For press inquiries, interviews, or additional information, please contact our PR team.
                </p>
                <div className="flex items-center text-orange-500 font-medium">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:press@idplay.co.id" className="hover:underline">press@idplay.co.id</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
