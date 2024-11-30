import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth';
import { useMenuStore } from '@/lib/store/menu';
import { cn } from '@/lib/utils';
import { NavGroup } from './nav-group';
import { ToggleButton } from './toggle-button';
import * as Icons from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const getVisibleGroups = useMenuStore((state) => state.getVisibleGroups);

  // Get menu groups based on user role
  const menuGroups = getVisibleGroups(user?.role || 'staff')
    .sort((a, b) => a.order - b.order);

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col border-r bg-white transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-[280px]'
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div
          className={cn(
            'text-xl font-bold text-teal-600 transition-all duration-300',
            isCollapsed && 'opacity-0'
          )}
        >
          {user?.facilityName}
        </div>
      </div>

      <ToggleButton
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuGroups.map((group) => (
          <NavGroup
            key={group.id}
            title={group.title}
            items={group.items.map(item => ({
              ...item,
              icon: Icons[item.icon as keyof typeof Icons],
            }))}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
}