import { z } from 'zod';

export type PatientStatus = 'On Going' | 'Warded' | 'Referral' | 'Unknown' | 'Ceased' | 'Transfer' | 'Booking';

export interface Patient {
  id: string;
  name: string;
  icNumber: string;
  gender: 'Male' | 'Female';
  panelCoverage: string[];
  status: PatientStatus;
  contactNumber: string;
  email: string;
  address: string;
  dateOfBirth: string;
  photo?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    photo?: string;
  };
  serologyData?: {
    hepBSurfaceAntigen: string;
    hepBSurfaceAntibody: string;
    antiHCV: string;
    hiv: string;
    vdrl: string;
  };
  clinicalData?: {
    diagnosis: string;
    bookingDate: string;
    coMorbidCondition: string;
  };
  dialysisData?: {
    firstHDAt: string;
    startDate: string;
    vascularAccess: string;
    fistulaDoneBy: string;
    handSide: string;
    doctorMemo?: string;
    patientId?: string;
  };
}