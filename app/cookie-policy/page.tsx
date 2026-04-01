import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - IdPlay',
  description: 'Cookie Policy for IdPlay services.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-black">Cookie Policy</h1>
        <p className="text-gray-500 mb-10 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">2. How We Use Cookies</h2>
            <p>
              We use cookies for several reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
              <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website, enabling us to personalize our content for you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Managing Cookies</h2>
            <p>
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
            </p>
            <p className="mt-4">
              Please note that if you choose to disable cookies, some parts of our website may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Third-Party Cookies</h2>
            <p>
              In some cases, we may also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Google Analytics:</strong> One of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Changes to This Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at support@idplay.co.id.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
