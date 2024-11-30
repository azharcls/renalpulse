import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PatientSchedule } from '../types/schedule';

interface ScheduleState {
  schedules: PatientSchedule[];
  addSchedule: (schedule: Omit<PatientSchedule, 'id'>) => void;
  updateSchedule: (id: string, updates: Partial<PatientSchedule>) => void;
  deleteSchedule: (id: string) => void;
  getPatientSchedules: (patientId: string) => PatientSchedule[];
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      schedules: [],
      addSchedule: (schedule) =>
        set((state) => ({
          schedules: [...state.schedules, { ...schedule, id: crypto.randomUUID() }],
        })),
      updateSchedule: (id, updates) =>
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, ...updates } : schedule
          ),
        })),
      deleteSchedule: (id) =>
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        })),
      getPatientSchedules: (patientId) => {
        return get().schedules.filter((schedule) => schedule.patientId === patientId);
      },
    }),
    {
      name: 'schedule-storage',
    }
  )
);