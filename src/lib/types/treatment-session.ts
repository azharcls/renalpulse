import { z } from 'zod';

export type BloodPressure = {
  systolic: number;
  diastolic: number;
};

export interface TreatmentSession {
  id: string;
  patientId: string;
  machineNumber: string;
  startTime: string;
  endTime?: string;
  treatmentDetails: {
    uf: number;
    bfr: number;
    heparinDosage: number;
    dialyzerType: string;
    vascularAccess: 'AVF' | 'AVG' | 'Catheter';
  };
  clinicalObservations: {
    bloodPressure: {
      before: BloodPressure;
      during?: BloodPressure[];
      after?: BloodPressure;
    };
    weight: {
      before: number;
      after?: number;
    };
    pulseRate: number;
    notes?: string;
  };
  logs: {
    userId: string;
    userName: string;
    timestamp: string;
    action: string;
  }[];
  status: 'ongoing' | 'completed' | 'terminated';
  shift: 1 | 2 | 3;
}

export const bloodPressureSchema = z.object({
  systolic: z.number().min(60).max(250),
  diastolic: z.number().min(40).max(150),
});

export const treatmentDetailsSchema = z.object({
  uf: z.number().min(0),
  bfr: z.number().min(0),
  heparinDosage: z.number().min(0),
  dialyzerType: z.string().min(1),
  vascularAccess: z.enum(['AVF', 'AVG', 'Catheter']),
});

export const clinicalObservationsSchema = z.object({
  bloodPressure: z.object({
    before: bloodPressureSchema,
    during: z.array(bloodPressureSchema).optional(),
    after: bloodPressureSchema.optional(),
  }),
  weight: z.object({
    before: z.number().min(0),
    after: z.number().min(0).optional(),
  }),
  pulseRate: z.number().min(0),
  notes: z.string().optional(),
});

export const treatmentSessionSchema = z.object({
  machineNumber: z.string().min(1),
  treatmentDetails: treatmentDetailsSchema,
  clinicalObservations: clinicalObservationsSchema,
});