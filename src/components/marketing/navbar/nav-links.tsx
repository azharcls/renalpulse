import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/lib/routes';

export function NavLinks() {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex md:items-center md:space-x-8">
      <a href="#features" className="text-gray-600 hover:text-teal-600">Features</a>
      <a href="#pricing" className="text-gray-600 hover:text-teal-600">Pricing</a>
      <a href="#testimonials" className="text-gray-600 hover:text-teal-600">Testimonials</a>
      <Button
        variant="outline"
        onClick={() => navigate(routes.auth.login)}
        className="ml-4 border-teal-600 text-teal-600 hover:bg-teal-50"
      >
        Sign In
      </Button>
      <Button
        onClick={() => navigate(routes.auth.register)}
        className="bg-teal-600 text-white hover:bg-teal-700"
      >
        Start Free Trial
      </Button>
    </div>
  );
}