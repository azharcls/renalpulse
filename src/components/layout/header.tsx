import { Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth';
import { routes } from '@/lib/routes';
import { Button } from '../ui/button';

export function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate(routes.home);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="text-lg font-semibold text-gray-900">Welcome back!</div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-sm">
            <p className="font-medium text-gray-900">{user?.email}</p>
            <p className="text-gray-500">
              {user?.role === 'superadmin' ? 'Superadmin' : 'Administrator'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}