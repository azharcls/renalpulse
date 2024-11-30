import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Staff } from '../types/staff';
import { mockStaff } from '../data/mock-staff';

interface StaffState {
  staff: Staff[];
  addStaff: (staff: Staff) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
}

export const useStaffStore = create<StaffState>()(
  persist(
    (set) => ({
      staff: mockStaff,
      addStaff: (staff) =>
        set((state) => ({
          staff: [...state.staff, { ...staff, id: crypto.randomUUID() }],
        })),
      updateStaff: (id, updates) =>
        set((state) => ({
          staff: state.staff.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      deleteStaff: (id) =>
        set((state) => ({
          staff: state.staff.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'staff-storage',
    }
  )
);