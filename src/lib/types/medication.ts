import { z } from 'zod';

export type MedicationStatus = 'pending' | 'given' | 'missed';
export type MedicationFrequency = 'daily' | 'weekly' | 'monthly' | 'custom';

export interface MedicationSchedule {
  id: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: MedicationFrequency;
  customFrequency?: number;
  startDate: string;
  endDate: string;
  scheduleDetails: MedicationScheduleDetail[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationScheduleDetail {
  id: string;
  scheduleId: string;
  date: string;
  status: MedicationStatus;
  givenBy?: string;
  givenAt?: string;
  notes?: string;
}

export const medicationScheduleSchema = z.object({
  medicationName: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']),
  customFrequency: z.number().min(1).optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  notes: z.string().optional(),
});

export const medicationStatusSchema = z.object({
  status: z.enum(['pending', 'given', 'missed']),
  notes: z.string().optional(),
});