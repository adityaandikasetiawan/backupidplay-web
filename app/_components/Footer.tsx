import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-0">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Logo and Company Info */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image
                // src="/imgs/logo-idplay.png"
                src="/idplay-logo.svg"
                alt="IdPlay Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/our-team"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Berita & Informasi</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/news"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Berita
                </a>
              </li>
              <li>
                <a
                  href="/article"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Artikel
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Akun</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="/login"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Masuk
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Daftar
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ikuti Kami</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/idplayofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/cx.idplay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@cx.idplay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/commerce-supercorridor-93427320a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
