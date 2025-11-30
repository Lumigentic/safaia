'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Strona główna' },
    { href: '/o-nas', label: 'O nas' },
    { href: '/katalog', label: 'Katalog' },
    { href: '/dla-autorow', label: 'Dla autorów' },
    { href: '/uslugi', label: 'Usługi wydawnicze' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-sapphire-deep to-violet-accent rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-lavender-soft to-transparent rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-all" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-medium tracking-tight text-sapphire-deep group-hover:text-violet-accent transition-colors">
                Safaia
              </h1>
              <p className="text-xs text-gray-600 font-body tracking-wide">
                Wydawnictwo
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-body text-sm tracking-wide transition-all duration-300 hover:text-sapphire-deep ${
                pathname === link.href
                  ? 'text-sapphire-deep font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-sapphire-deep to-violet-accent" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/dla-autorow"
            className="px-6 py-2.5 bg-sapphire-deep text-white font-body text-sm tracking-wide rounded-sm hover:bg-indigo-dark transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Wyślij manuskrypt
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-sapphire-deep"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-body text-base py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-sapphire-deep font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dla-autorow"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 px-6 py-3 bg-sapphire-deep text-white font-body text-sm text-center tracking-wide rounded-sm"
            >
              Wyślij manuskrypt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
