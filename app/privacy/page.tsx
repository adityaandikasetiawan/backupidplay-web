import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - IdPlay',
  description: 'Privacy Policy for IdPlay services.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-black">Privacy Policy</h1>
        <p className="text-gray-500 mb-10 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us. This information may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Name and contact information (email address, phone number).</li>
              <li>Billing and payment information.</li>
              <li>Demographic information and preferences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Process transactions and send related information.</li>
              <li>Send you technical notices, updates, security alerts, and support messages.</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Communicate with you about products, services, offers, and events.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as described in this policy. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
              <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Your Choices</h2>
            <p>
              You may update, correct, or delete your account information at any time by logging into your online account or by contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@idplay.co.id.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
