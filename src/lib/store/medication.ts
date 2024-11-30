import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MedicationSchedule, MedicationStatus } from '../types/medication';
import { addDays, eachWeekOfInterval, eachMonthOfInterval, startOfMonth } from 'date-fns';

interface MedicationState {
  schedules: MedicationSchedule[];
  addSchedule: (schedule: Omit<MedicationSchedule, 'id' | 'scheduleDetails' | 'createdAt' | 'updatedAt'>) => void;
  updateScheduleStatus: (scheduleId: string, detailId: string, status: MedicationStatus, userId: string, notes?: string) => void;
  getPatientSchedules: (patientId: string) => MedicationSchedule[];
  getSchedulesByMonth: (year: number, month: number) => MedicationSchedule[];
  deleteSchedule: (id: string) => void;
}

function generateScheduleDates(
  startDate: string,
  endDate: string,
  frequency: string,
  customFrequency?: number
): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: Date[] = [];

  switch (frequency) {
    case 'daily':
      for (let d = start; d <= end; d = addDays(d, 1)) {
        dates.push(new Date(d));
      }
      break;
    case 'weekly':
      eachWeekOfInterval({ start, end }).forEach(weekStart => {
        dates.push(weekStart);
      });
      break;
    case 'monthly':
      eachMonthOfInterval({ start, end }).forEach(monthStart => {
        dates.push(startOfMonth(monthStart));
      });
      break;
    case 'custom':
      if (customFrequency) {
        for (let d = start; d <= end; d = addDays(d, customFrequency)) {
          dates.push(new Date(d));
        }
      }
      break;
  }

  return dates;
}

export const useMedicationStore = create<MedicationState>()(
  persist(
    (set, get) => ({
      schedules: [],
      addSchedule: (scheduleData) => {
        const id = crypto.randomUUID();
        const dates = generateScheduleDates(
          scheduleData.startDate,
          scheduleData.endDate,
          scheduleData.frequency,
          scheduleData.customFrequency
        );

        const scheduleDetails = dates.map(date => ({
          id: crypto.randomUUID(),
          scheduleId: id,
          date: date.toISOString(),
          status: 'pending' as MedicationStatus,
        }));

        const schedule: MedicationSchedule = {
          ...scheduleData,
          id,
          scheduleDetails,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          schedules: [...state.schedules, schedule],
        }));
      },
      updateScheduleStatus: (scheduleId, detailId, status, userId, notes) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === scheduleId
              ? {
                  ...schedule,
                  updatedAt: new Date().toISOString(),
                  scheduleDetails: schedule.scheduleDetails.map((detail) =>
                    detail.id === detailId
                      ? {
                          ...detail,
                          status,
                          givenBy: status === 'given' ? userId : undefined,
                          givenAt: status === 'given' ? new Date().toISOString() : undefined,
                          notes,
                        }
                      : detail
                  ),
                }
              : schedule
          ),
        }));
      },
      getPatientSchedules: (patientId) => {
        return get().schedules.filter((schedule) => schedule.patientId === patientId);
      },
      getSchedulesByMonth: (year, month) => {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        return get().schedules.filter((schedule) =>
          schedule.scheduleDetails.some(
            (detail) => {
              const date = new Date(detail.date);
              return date >= startDate && date <= endDate;
            }
          )
        );
      },
      deleteSchedule: (id) =>
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        })),
    }),
    {
      name: 'medication-schedules',
    }
  )
);