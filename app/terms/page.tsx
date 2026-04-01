import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use - IdPlay',
  description: 'Terms and conditions for using IdPlay services.',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-black">Terms of Use</h1>
        <p className="text-gray-500 mb-10 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Introduction</h2>
            <p>
              Welcome to IdPlay. By accessing or using our website, services, and applications, you agree to be bound by these Terms of Use. Please read them carefully. If you do not agree to these terms, you should not access or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">2. Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account. You must not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Use the service in any way that violates any applicable local, national, or international law.</li>
              <li>Attempt to gain unauthorized access to any portion of the service or its related systems.</li>
              <li>Interfere with or disrupt the integrity or performance of the services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Account Registration</h2>
            <p>
              To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@idplay.co.id.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
