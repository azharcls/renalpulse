import { z } from 'zod';

export type TimeSlot = '06:00' | '07:00' | '08:00' | '09:00' | '10:00' | '11:00' | 
                      '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | 
                      '18:00' | '19:00' | '20:00' | '21:00' | '22:00' | '23:00';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface PatientSchedule {
  id: string;
  patientId: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
  shift: 'Morning' | 'Evening' | 'Night';
  machineNumber: string;
  notes?: string;
  recurring: boolean;
  startDate: string;
  endDate?: string;
}

export const scheduleSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  timeSlot: z.string().min(1, 'Time slot is required'),
  shift: z.enum(['Morning', 'Evening', 'Night']),
  machineNumber: z.string().min(1, 'Machine number is required'),
  notes: z.string().optional(),
  recurring: z.boolean(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});