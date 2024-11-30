import { z } from 'zod';

export type StaffStatus = 'On Duty' | 'On Leave' | 'Off Duty';
export type StaffPosition = 'post_basic_nurse' | 'dialysis_assistant' | 'staff_nurse' | 'admin_staff' | 'medical_officer' | 'support_staff';
export type StaffRole = 'staff' | 'admin';
export type ShiftType = 'Morning' | 'Evening' | 'Night';

export interface Staff {
  id: string;
  name: string;
  position: StaffPosition;
  email: string;
  phone: string;
  status: StaffStatus;
  photo?: string;
  username: string;
  password: string;
  role: StaffRole;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    address: string;
  };
  schedule?: {
    shift: ShiftType;
    workDays: string[];
  };
}

export const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Emergency contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(1, 'Emergency contact phone is required'),
  address: z.string().min(1, 'Emergency contact address is required'),
});

export const scheduleSchema = z.object({
  shift: z.enum(['Morning', 'Evening', 'Night']),
  workDays: z.array(z.string()),
});

export const staffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.enum([
    'post_basic_nurse',
    'dialysis_assistant',
    'staff_nurse',
    'admin_staff',
    'medical_officer',
    'support_staff'
  ], { required_error: 'Position is required' }),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  status: z.enum(['On Duty', 'On Leave', 'Off Duty']),
  photo: z.any().optional(),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['staff', 'admin']).default('staff'),
  emergencyContact: emergencyContactSchema,
  schedule: scheduleSchema,
});