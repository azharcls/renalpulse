import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(1, 'Patient name is required'),
  identificationNumber: z.string().min(1, 'Identification number is required'),
  gender: z.enum(['male', 'female', 'other']).optional(),
  status: z.enum(['On Going', 'Warded', 'Referral', 'Unknown', 'Ceased', 'Transfer', 'Booking'] as const, {
    required_error: 'Status is required',
  }),
  occupation: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  panels: z.array(z.string()).optional(),

  emergencyContact: z.object({
    name: z.string().optional(),
    identificationNumber: z.string().optional(),
    phone: z.string().optional(),
    relation: z.string().optional(),
    occupation: z.string().optional(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    address: z.string().optional(),
    photo: z.any().optional(),
  }),

  serologyData: z.object({
    hepBSurfaceAntigen: z.enum(['positive', 'negative']).optional(),
    hepBSurfaceAntibody: z.enum(['positive', 'negative']).optional(),
    antiHCV: z.enum(['positive', 'negative']).optional(),
    hiv: z.enum(['positive', 'negative']).optional(),
    vdrl: z.enum(['positive', 'negative']).optional(),
  }),

  clinicalData: z.object({
    diagnosis: z.string().optional(),
    bookingDate: z.string().min(1, 'Booking date is required'),
    coMorbidCondition: z.string().optional(),
  }),

  dialysisData: z.object({
    firstHDAt: z.string().min(1, 'First HD location is required'),
    startDate: z.string().optional(),
    vascularAccess: z.enum(['avf', 'avg', 'catheter']).optional(),
    fistulaDoneBy: z.string().optional(),
    handSide: z.enum(['left', 'right']).optional(),
    doctorMemo: z.any().optional(),
    patientId: z.any().optional(),
  }),
});

export type PatientFormData = z.infer<typeof patientSchema>;