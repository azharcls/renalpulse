import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Package,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth';

const navigation = [
  { name: 'Overview', href: routes.dashboard.overview, icon: LayoutDashboard },
  { name: 'Staff', href: routes.dashboard.staff, icon: UserCog },
  { name: 'Duty Roster', href: routes.dashboard.dutyRoster, icon: Calendar }, // Tambah Duty Roster
  { name: 'Patients', href: routes.dashboard.patients, icon: Users },
  { name: 'Schedule', href: routes.dashboard.schedule, icon: Calendar },
  { name: 'Inventory', href: routes.dashboard.inventory, icon: Package },
  { name: 'Settings', href: routes.dashboard.settings, icon: Settings },
  { name: 'Panel', href: routes.dashboard.panel, icon: Users }, // Tambah Panel
  { name: 'Patient Profile', href: routes.dashboard.patientProfile, icon: Users }, // Tambah Patient Profile

  { name: 'Report', href: routes.dashboard.report, icon: LayoutDashboard }, // Tambah Report
  { name: 'Billing', href: routes.dashboard.billing, icon: Package }, // Tambah Billing
  
  { name: 'In Session', href: routes.dashboard.inSession, icon: LayoutDashboard }, // Tambah In Session
  { name: 'Medication', href: routes.dashboard.medication, icon: Package }, // Tambah Medication
  { name: 'Patient Schedule', href: routes.dashboard.patientSchedule, icon: Calendar }, // Tambah Patient Schedule
  { name: 'Item List', href: routes.dashboard.itemList, icon: Package }, // Tambah Item List
  { name: 'Stock', href: routes.dashboard.stock, icon: Package }, // Tambah Stock
  { name: 'Stock Report', href: routes.dashboard.stockReport, icon: LayoutDashboard }, // Tambah Stock Report
  { name: 'Suppliers', href: routes.dashboard.suppliers, icon: Users }, // Tambah Suppliers
  { name: 'Orders', href: routes.dashboard.orders, icon: Package }, // Tambah Orders
];


export function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="text-xl font-bold text-white">{user?.facilityName}</div>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-300'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="flex-shrink-0 px-2 py-4">
        <button
          onClick={() => logout()}
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
          Sign out
        </button>
      </div>
    </div>
  );
}