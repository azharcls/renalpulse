import { z } from 'zod';

export type MenuRole = 'superadmin' | 'admin' | 'staff';

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  roles: MenuRole[];
  order: number;
}

export interface MenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
  order: number;
  roles: MenuRole[];
}

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Menu name is required'),
  icon: z.string().min(1, 'Icon is required'),
  roles: z.array(z.enum(['superadmin', 'admin', 'staff'])).min(1, 'At least one role must be selected'),
  order: z.number().min(0),
});

export const menuGroupSchema = z.object({
  title: z.string().min(1, 'Group title is required'),
  roles: z.array(z.enum(['superadmin', 'admin', 'staff'])).min(1, 'At least one role must be selected'),
  order: z.number().min(0),
});