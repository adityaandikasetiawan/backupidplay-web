import React from 'react';
import { Metadata } from 'next';
import FAQ from '../_components/FAQ';

export const metadata: Metadata = {
  title: 'FAQ - IdPlay',
  description: 'Frequently Asked Questions about IdPlay services.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <div className="container mx-auto px-4 text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-4">Find answers to common questions about our services.</p>
        </div>
        <FAQ />
      </div>
    </div>
  );
}
