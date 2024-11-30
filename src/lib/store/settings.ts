import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompanyProfile, ShiftDefinition, PricingConfig } from '../types/settings';

interface SettingsState {
  companyProfile: CompanyProfile;
  shifts: ShiftDefinition[];
  pricing: PricingConfig[];
  updateCompanyProfile: (profile: CompanyProfile) => void;
  addShift: (shift: Omit<ShiftDefinition, 'id'>) => void;
  updateShift: (id: string, shift: Partial<ShiftDefinition>) => void;
  deleteShift: (id: string) => void;
  addPricing: (pricing: Omit<PricingConfig, 'id'>) => void;
  updatePricing: (id: string, pricing: Partial<PricingConfig>) => void;
  deletePricing: (id: string) => void;
}

const defaultCompanyProfile: CompanyProfile = {
  name: 'RenalPulse Healthcare',
  address: '123 Healthcare Street, Medical District',
  phone: '+60 3-1234 5678',
  email: 'contact@renalpulse.com',
  registrationNumber: 'HC123456',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      companyProfile: defaultCompanyProfile,
      shifts: [
        {
          id: '1',
          name: 'Morning Shift',
          startTime: '06:00',
          endTime: '14:00',
          isActive: true,
        },
        {
          id: '2',
          name: 'Evening Shift',
          startTime: '14:00',
          endTime: '22:00',
          isActive: true,
        },
        {
          id: '3',
          name: 'Night Shift',
          startTime: '22:00',
          endTime: '06:00',
          isActive: true,
        },
      ],
      pricing: [
        {
          id: '1',
          name: 'Standard Hemodialysis',
          type: 'treatment',
          basePrice: 350.00,
          description: 'Regular hemodialysis session',
          isActive: true,
        },
        {
          id: '2',
          name: 'EPO Injection',
          type: 'care',
          basePrice: 80.00,
          description: 'Erythropoietin injection',
          isActive: true,
        },
      ],
      updateCompanyProfile: (profile) =>
        set({ companyProfile: profile }),
      addShift: (shift) =>
        set((state) => ({
          shifts: [...state.shifts, { ...shift, id: crypto.randomUUID() }],
        })),
      updateShift: (id, shift) =>
        set((state) => ({
          shifts: state.shifts.map((s) =>
            s.id === id ? { ...s, ...shift } : s
          ),
        })),
      deleteShift: (id) =>
        set((state) => ({
          shifts: state.shifts.filter((s) => s.id !== id),
        })),
      addPricing: (pricing) =>
        set((state) => ({
          pricing: [...state.pricing, { ...pricing, id: crypto.randomUUID() }],
        })),
      updatePricing: (id, pricing) =>
        set((state) => ({
          pricing: state.pricing.map((p) =>
            p.id === id ? { ...p, ...pricing } : p
          ),
        })),
      deletePricing: (id) =>
        set((state) => ({
          pricing: state.pricing.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);