import { z } from 'zod';

export interface Treatment {
  id: string;
  name: string;
  costPerSession: number;
  description?: string;
  status: 'active' | 'inactive';
}

export interface CareService {
  id: string;
  name: string;
  costPerSession: number;
  description?: string;
  status: 'active' | 'inactive';
}

export const treatmentSchema = z.object({
  name: z.string().min(1, 'Treatment name is required'),
  costPerSession: z.coerce.number().min(0, 'Cost must be a positive number'),
  description: z.string().optional(),
});

export const careServiceSchema = z.object({
  name: z.string().min(1, 'Care service name is required'),
  costPerSession: z.coerce.number().min(0, 'Cost must be a positive number'),
  description: z.string().optional(),
});