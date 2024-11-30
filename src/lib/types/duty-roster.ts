import { z } from 'zod';

export type ShiftType = 'Morning' | 'Evening' | 'Night';

export interface DutyRoster {
  id: string;
  staffId: string;
  date: string;
  shift: ShiftType;
  status: 'Scheduled' | 'Completed' | 'Absent';
  notes?: string;
}

export const dutyRosterSchema = z.object({
  staffId: z.string().min(1, 'Staff member is required'),
  date: z.string().min(1, 'Date is required'),
  shift: z.enum(['Morning', 'Evening', 'Night']),
  status: z.enum(['Scheduled', 'Completed', 'Absent']),
  notes: z.string().optional(),
});