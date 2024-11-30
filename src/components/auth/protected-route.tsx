import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth';
import { routes } from '@/lib/routes';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={routes.auth.login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}