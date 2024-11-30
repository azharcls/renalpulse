import { useLocation } from 'react-router-dom';
import { NavLink } from './nav-link';
import { cn } from '@/lib/utils';

interface NavGroupProps {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  isCollapsed: boolean;
}

export function NavGroup({ title, items, isCollapsed }: NavGroupProps) {
  const location = useLocation();

  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.name}
            item={item}
            isActive={location.pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
}