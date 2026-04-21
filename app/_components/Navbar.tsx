'use client';

import { FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Kategori',
    href: '/kategori',
    hasDropdown: true,
    subItems: [
      { label: 'Rumah', href: '/kategori/rumah' },
      { label: 'Bisnis', href: '/kategori/bisnis' },
      // { label: 'Add-ons', href: '/kategori/add-ons' },
    ],
  },
  { 
    label: 'Berita & Informasi', 
    // href: '/article', 
    hasDropdown: true, 
    subItems: [
      {
        label: 'Blog & Artikel',
        href: '/article',
      },
      {
        label: 'Berita',
        href: '/news',
      }
    ]
  }, 
  { label: 'Regional', href: '/regional', hasDropdown: false } // sementara false, menunggu subitem
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);



  useEffect(() => {
    // Menutup dropdown profile ketika mengklik di luar
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  useEffect(() => {
    const sessionKey = '__next_chunk_reload_ts__';

    const isChunkLoadError = (reason: unknown): boolean => {
      const message =
        typeof reason === 'string'
          ? reason
          : typeof reason === 'object' && reason !== null
            ? String((reason as any).message ?? reason)
            : '';

      const name = typeof reason === 'object' && reason !== null ? (reason as any).name : undefined;
      if (name === 'ChunkLoadError') return true;
      return /ChunkLoadError|Loading chunk \d+ failed/i.test(message);
    };

    const reloadSafely = () => {
      try {
        const now = Date.now();
        const last = Number(sessionStorage.getItem(sessionKey) || 0);
        if (now - last < 30_000) return;
        sessionStorage.setItem(sessionKey, String(now));
      } catch {
        return;
      }
      window.location.reload();
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) reloadSafely();
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      setOpenMobileDropdown(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleDesktopDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    router.push("/");
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 left-0 w-full bg-white h-14 md:h-16 px-4 md:px-8 flex justify-between items-center z-50 transition-all duration-300 ease-in-out',
          isScrolled ? 'shadow-md' : ''
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="w-26 h-10 flex items-center">
            <Image src="/idplay-logo.svg" alt="IdPlay Logo" width={120} height={40} priority />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDesktopDropdown(item.label)}
                    className={clsx(
                      'text-gray-700 hover:text-orange-500 transition-colors flex items-center',
                      isActive && 'text-orange-500'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {openDropdown === item.label && item.subItems && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            // Only render Link if item.href exists
            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    'text-gray-700 hover:text-orange-500 transition-colors flex items-center',
                    isActive && 'text-orange-500'
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-x-6">
          {isLoggedIn && user ? (
            <div className="flex items-center gap-x-4">
              {/* Total Points */}
              <div className="flex items-center gap-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium text-green-700">
                  {user.total_points} Points
                </span>
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                  <FaUser className="h-4 w-4" />
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center gap-x-2"
                    >
                      <FaSignOutAlt className="h-3 w-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <Link href="/login" className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-1.5 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="relative w-6 h-6 text-gray-700 focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <FaBars
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <FaTimes
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 transform ${
                isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={clsx(
          'md:hidden fixed top-14 md:top-16 left-0 w-full bg-white shadow-lg z-40 transform transition-all duration-300 origin-top',
          isMenuOpen
            ? 'scale-y-100 opacity-100 max-h-screen'
            : 'scale-y-0 opacity-0 max-h-0 overflow-hidden'
        )}
      >
        <div className="flex flex-col items-center space-y-4 py-4 text-gray-700 text-sm font-medium">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.hasDropdown) {
              return (
                <div key={item.label} className="w-full text-center">
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className={clsx(
                      'w-full flex items-center justify-center transition-colors',
                      isActive ? 'text-orange-500' : 'hover:text-orange-500'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {openMobileDropdown === item.label && item.subItems && (
                    <div className="flex flex-col items-center space-y-2 mt-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="text-gray-700 hover:text-orange-500 transition-colors"
                          onClick={toggleMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            // Only render Link if item.href exists
            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    'transition-colors flex items-center',
                    isActive ? 'text-orange-500' : 'hover:text-orange-500'
                  )}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}
          
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 w-full justify-center">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium text-green-700">
                    {user.total_points} Points
                  </span>
                </div>
                <Link href="/dashboard" className="px-4 py-1.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-4 py-1.5 border border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors" onClick={toggleMenu}>
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-1.5 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
