import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLinks } from './nav-links';
import { MobileMenu } from './mobile-menu';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-teal-600">RenalPulse</span>
          </div>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-teal-50 hover:text-teal-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <MobileMenu isOpen={isMenuOpen} />
      </div>
    </nav>
  );
}