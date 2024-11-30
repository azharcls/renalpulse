import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/lib/routes';

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-600">
          Features
        </a>
        <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-600">
          Pricing
        </a>
        <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-600">
          Testimonials
        </a>
        <div className="mt-4 space-y-2 px-3">
          <Button
            variant="outline"
            onClick={() => navigate(routes.auth.login)}
            className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate(routes.auth.register)}
            className="w-full bg-teal-600 text-white hover:bg-teal-700"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
}