import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { routes } from '@/lib/routes';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">RenalPulse</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
            <Button
              variant="outline"
              onClick={() => navigate(routes.auth.login)}
              className="ml-4"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate(routes.auth.register)}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600">
              Features
            </a>
            <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600">
              Pricing
            </a>
            <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600">
              Testimonials
            </a>
            <div className="mt-4 space-y-2 px-3">
              <Button
                variant="outline"
                onClick={() => navigate(routes.auth.login)}
                className="w-full"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate(routes.auth.register)}
                className="w-full"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}