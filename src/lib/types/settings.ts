import { z } from 'zod';

export interface CompanyProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  registrationNumber: string;
  taxId?: string;
}

export interface ShiftDefinition {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface PricingConfig {
  id: string;
  name: string;
  type: 'treatment' | 'care';
  basePrice: number;
  description?: string;
  isActive: boolean;
}

export const companyProfileSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid website URL').optional(),
  logo: z.string().optional(),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  taxId: z.string().optional(),
});

export const shiftDefinitionSchema = z.object({
  name: z.string().min(1, 'Shift name is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  isActive: z.boolean().default(true),
});

export const pricingConfigSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  type: z.enum(['treatment', 'care']),
  basePrice: z.number().min(0, 'Price must be non-negative'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});