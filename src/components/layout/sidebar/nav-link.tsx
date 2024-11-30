import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavLinkProps {
  item: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    subItems?: { name: string; href: string }[];
  };
  isActive: boolean;
  isCollapsed: boolean;
}

export function NavLink({ item, isActive, isCollapsed }: NavLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium',
            isActive
              ? 'bg-teal-600 text-white'
              : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
          )}
          title={isCollapsed ? item.name : undefined}
        >
          <div className="flex items-center">
            <item.icon
              className={cn(
                'h-5 w-5',
                isCollapsed ? 'mx-auto' : 'mr-3',
                isActive ? 'text-white' : 'text-gray-400 group-hover:text-teal-600'
              )}
            />
            {!isCollapsed && item.name}
          </div>
          {!isCollapsed && (
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-180',
                isActive ? 'text-white' : 'text-gray-400'
              )}
            />
          )}
        </button>
        {!isCollapsed && isOpen && (
          <div className="mt-1 space-y-1 pl-10">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.href}
                to={subItem.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'text-teal-600'
                    : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                )}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      className={cn(
        'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
        isActive
          ? 'bg-teal-600 text-white'
          : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
      )}
      title={isCollapsed ? item.name : undefined}
    >
      <item.icon
        className={cn(
          'h-5 w-5',
          isCollapsed ? 'mx-auto' : 'mr-3',
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-teal-600'
        )}
      />
      {!isCollapsed && item.name}
    </Link>
  );
}