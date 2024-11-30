import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DutyRoster } from '../types/duty-roster';

interface DutyRosterState {
  rosters: DutyRoster[];
  addRoster: (roster: Omit<DutyRoster, 'id'>) => void;
  updateRoster: (id: string, updates: Partial<DutyRoster>) => void;
  deleteRoster: (id: string) => void;
  getRostersByDate: (date: string) => DutyRoster[];
  getRostersByStaff: (staffId: string) => DutyRoster[];
}

export const useDutyRosterStore = create<DutyRosterState>()(
  persist(
    (set, get) => ({
      rosters: [],
      addRoster: (roster) =>
        set((state) => ({
          rosters: [...state.rosters, { ...roster, id: crypto.randomUUID() }],
        })),
      updateRoster: (id, updates) =>
        set((state) => ({
          rosters: state.rosters.map((roster) =>
            roster.id === id ? { ...roster, ...updates } : roster
          ),
        })),
      deleteRoster: (id) =>
        set((state) => ({
          rosters: state.rosters.filter((roster) => roster.id !== id),
        })),
      getRostersByDate: (date) => {
        return get().rosters.filter((roster) => roster.date === date);
      },
      getRostersByStaff: (staffId) => {
        return get().rosters.filter((roster) => roster.staffId === staffId);
      },
    }),
    {
      name: 'duty-roster-storage',
    }
  )
);