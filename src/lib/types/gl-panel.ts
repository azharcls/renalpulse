import { z } from 'zod';

export interface GLPanel {
  id: string;
  patientId: string;
  panelName: string;
  hdCoverage: {
    amountPerSession: number;
    maxSessions?: number;
  };
  medications: {
    name: string;
    amount: number;
    volume: number;
    unit: string;
  }[];
  effectiveDate: string;
  expiryDate: string;
  notes?: string;
  status: 'active' | 'expired';
  documents?: {
    glLetter?: string;
    supportingDocs?: string[];
  };
}

export const glPanelSchema = z.object({
  panelName: z.string().min(1, 'Panel name is required'),
  hdCoverage: z.object({
    amountPerSession: z.coerce.number().min(0, 'Amount per session must be positive'),
    maxSessions: z.coerce.number().min(1, 'Maximum sessions must be at least 1').optional(),
  }),
  medications: z.array(z.object({
    name: z.string().min(1, 'Medication name is required'),
    amount: z.coerce.number().min(0, 'Amount must be positive'),
    volume: z.coerce.number().min(0, 'Volume must be positive'),
    unit: z.string().min(1, 'Unit is required'),
  })),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  notes: z.string().optional(),
  documents: z.object({
    glLetter: z.any().optional(),
    supportingDocs: z.array(z.any()).optional(),
  }).optional(),
});