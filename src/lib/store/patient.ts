import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Patient } from '../types/patient';
import { mockPatients } from '../data/mock-patients';

interface PatientState {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: mockPatients,
      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, { ...patient, id: crypto.randomUUID() }],
        })),
      updatePatient: (id, updates) =>
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === id ? { ...patient, ...updates } : patient
          ),
        })),
      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        })),
    }),
    {
      name: 'patient-storage',
    }
  )
);