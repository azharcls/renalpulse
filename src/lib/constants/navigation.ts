import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Settings,
  FileBarChart,
  Stethoscope,
  Activity,
  Pill,
  Building2,
  Receipt,
  ArrowDownUp,
} from 'lucide-react';
import { routes } from '../routes';

export const navigation = {
  overview: {
    title: 'Overview',
    order: 1,
    items: [
      { name: 'Overview', href: routes.dashboard.overview, icon: LayoutDashboard },
    ],
  },
  staff: {
    title: 'Staff',
    order: 2,
    items: [
      { name: 'Staff', href: routes.dashboard.staff, icon: UserCog },
    ],
  },
  roster: {
    title: 'Roster',
    order: 3,
    items: [
      { name: 'Duty Roster', href: routes.dashboard.dutyRoster, icon: Calendar },
    ],
  },
  patients: {
    title: 'Patients',
    order: 4,
    items: [
      { name: 'Patients', href: routes.dashboard.patients, icon: Users },
    ],
  },
  schedule: {
    title: 'Schedule',
    order: 5,
    items: [
      { name: 'Schedule', href: routes.dashboard.schedule, icon: Calendar },
    ],
  },
  panel: {
    title: 'Panel',
    order: 6,
    items: [
      { name: 'Panel', href: routes.dashboard.panel, icon: Building2 },
    ],
  },
  medication: {
    title: 'Medication',
    order: 7,
    items: [
      { name: 'Medication', href: routes.dashboard.medication, icon: Pill },
    ],
  },
  session: {
    title: 'Treatment',
    order: 8,
    items: [
      { name: 'In Session', href: routes.dashboard.inSession, icon: Activity },
    ],
  },
  report: {
    title: 'Reports',
    order: 9,
    items: [
      { name: 'Report', href: routes.dashboard.report, icon: FileBarChart },
    ],
  },
  billing: {
    title: 'Billing',
    order: 10,
    items: [
      { name: 'Billing', href: routes.dashboard.billing, icon: Receipt },
    ],
  },
  stock: {
    title: 'Stock',
    order: 11,
    items: [
      { name: 'Stock', href: routes.dashboard.stock, icon: ArrowDownUp },
    ],
  },
  settings: {
    title: 'Settings',
    order: 12,
    items: [
      { name: 'Settings', href: routes.dashboard.settings, icon: Settings },
    ],
  },
} as const;