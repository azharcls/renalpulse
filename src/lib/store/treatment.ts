import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Treatment, CareService } from '../types/treatment';

interface TreatmentState {
  treatments: Treatment[];
  careServices: CareService[];
  addTreatment: (treatment: Omit<Treatment, 'id' | 'status'>) => void;
  updateTreatment: (id: string, updates: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
  addCareService: (service: Omit<CareService, 'id' | 'status'>) => void;
  updateCareService: (id: string, updates: Partial<CareService>) => void;
  deleteCareService: (id: string) => void;
}

export const useTreatmentStore = create<TreatmentState>()(
  persist(
    (set) => ({
      treatments: [
        {
          id: '1',
          name: 'Hemodialysis',
          costPerSession: 200.00,
          description: 'Standard hemodialysis treatment',
          status: 'active',
        },
        {
          id: '2',
          name: 'HD Referral',
          costPerSession: 250.00,
          description: 'Hemodialysis treatment for referred patients',
          status: 'active',
        },
      ],
      careServices: [
        {
          id: '1',
          name: 'EPO',
          costPerSession: 80.00,
          description: 'Erythropoietin injection',
          status: 'active',
        },
        {
          id: '2',
          name: 'ZEM',
          costPerSession: 50.00,
          description: 'Iron supplement',
          status: 'active',
        },
      ],
      addTreatment: (treatment) =>
        set((state) => ({
          treatments: [
            ...state.treatments,
            { ...treatment, id: crypto.randomUUID(), status: 'active' },
          ],
        })),
      updateTreatment: (id, updates) =>
        set((state) => ({
          treatments: state.treatments.map((treatment) =>
            treatment.id === id ? { ...treatment, ...updates } : treatment
          ),
        })),
      deleteTreatment: (id) =>
        set((state) => ({
          treatments: state.treatments.filter((treatment) => treatment.id !== id),
        })),
      addCareService: (service) =>
        set((state) => ({
          careServices: [
            ...state.careServices,
            { ...service, id: crypto.randomUUID(), status: 'active' },
          ],
        })),
      updateCareService: (id, updates) =>
        set((state) => ({
          careServices: state.careServices.map((service) =>
            service.id === id ? { ...service, ...updates } : service
          ),
        })),
      deleteCareService: (id) =>
        set((state) => ({
          careServices: state.careServices.filter((service) => service.id !== id),
        })),
    }),
    {
      name: 'treatment-storage',
    }
  )
);