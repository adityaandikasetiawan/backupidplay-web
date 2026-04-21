import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';
import 'leaflet/dist/leaflet.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'idplay.co.id',
  description: 'Homepage IDPlay di domain idplay.co.id: paket, layanan, promo, testimoni, coverage.',
  icons: {
    icon: [{ url: '/favicon.webp?v=2', type: 'image/webp', sizes: 'any' }],
    shortcut: [{ url: '/favicon.webp?v=2', type: 'image/webp' }],
    apple: [{ url: '/favicon.webp?v=2', type: 'image/webp' }]
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WVN7SRD3"
          strategy="beforeInteractive"
        />
        <Script id="chunk-error-reload" strategy="afterInteractive">
          {`(() => {
            let reloading = false;
            const shouldReload = (value: unknown) => {
              const text =
                typeof value === 'string'
                  ? value
                  : value && typeof value === 'object' && 'message' in value
                    ? String((value as { message?: unknown }).message ?? '')
                    : String(value ?? '');

              return (
                text.includes('ChunkLoadError') ||
                text.includes('Loading chunk') ||
                text.includes('CSS_CHUNK_LOAD_FAILED') ||
                text.includes('net::ERR_ABORTED')
              );
            };

            const reloadOnce = () => {
              if (reloading) return;
              reloading = true;
              window.location.reload();
            };

            window.addEventListener('error', (event) => {
              if (shouldReload((event as ErrorEvent)?.message)) reloadOnce();
            });

            window.addEventListener('unhandledrejection', (event) => {
              if (shouldReload((event as PromiseRejectionEvent)?.reason)) reloadOnce();
            });
          })();`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVN7SRD3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navbar />
        {children}
        <Footer />
        <Toaster
          richColors
          theme="light"
          position="top-right"
        />
        <a
          href="https://wa.me/6282289986477?text=Hello%20there!"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Contact us on WhatsApp"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-14 h-14 rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="absolute w-14 h-14 rounded-full bg-green-500 opacity-50 animate-pulse"></span>
          </span>
          <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.563 4.216 1.625 6.063l-1.5 5.5 5.688-1.469A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.156 0-4.25-.703-5.938-2l-.344-.219-3.375.875.906-3.313-.219-.344A10.002 10.002 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.344-6.5c-.313-.156-1.844-.906-2.125-1.016-.281-.109-.469-.172-.656.172-.188.344-.75 1.016-.906 1.219-.156.203-.313.219-.625.063-.313-.156-1.328-.484-2.531-1.547-.938-.828-1.578-1.859-1.766-2.203-.188-.344-.019-.531.141-.688.141-.141.313-.344.469-.516.156-.172.203-.297.313-.5.109-.203.047-.375-.016-.547-.063-.172-.563-1.359-.781-1.859-.219-.5-.438-.422-.625-.422-.172 0-.344 0-.531.016-.188.016-.469.188-.719.625-.25.438-.969 1.063-.969 2.594 0 1.531 1.109 3.016 1.266 3.219.156.203 2.188 3.531 5.344 4.953.75.344 1.344.547 1.797.703.469.156.875.125 1.203.063.344-.063 1.063-.438 1.219-.859.156-.422.156-.781.109-.859-.047-.078-.172-.141-.313-.219z"/>
            </svg>
          </div>
        </a>
      </body>
    </html>
  );
}
