import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TreatmentSession } from '../types/treatment-session';

interface TreatmentSessionState {
  sessions: TreatmentSession[];
  addSession: (session: Omit<TreatmentSession, 'id' | 'logs'>) => string;
  updateSession: (id: string, updates: Partial<TreatmentSession>) => void;
  addLog: (sessionId: string, userId: string, userName: string, action: string) => void;
  getActiveSessionsByShift: (shift: 1 | 2 | 3) => TreatmentSession[];
  getSessionById: (id: string) => TreatmentSession | undefined;
  completeSession: (id: string) => void;
}

export const useTreatmentSessionStore = create<TreatmentSessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      addSession: (sessionData) => {
        const id = crypto.randomUUID();
        const session: TreatmentSession = {
          ...sessionData,
          id,
          logs: [],
          status: 'ongoing',
        };
        set((state) => ({
          sessions: [...state.sessions, session],
        }));
        return id;
      },
      updateSession: (id, updates) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, ...updates } : session
          ),
        })),
      addLog: (sessionId, userId, userName, action) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  logs: [
                    ...session.logs,
                    {
                      userId,
                      userName,
                      timestamp: new Date().toISOString(),
                      action,
                    },
                  ],
                }
              : session
          ),
        })),
      getActiveSessionsByShift: (shift) => {
        const { sessions } = get();
        return sessions.filter(
          (session) => session.shift === shift && session.status === 'ongoing'
        );
      },
      getSessionById: (id) => {
        const { sessions } = get();
        return sessions.find((session) => session.id === id);
      },
      completeSession: (id) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id
              ? {
                  ...session,
                  status: 'completed',
                  endTime: new Date().toISOString(),
                }
              : session
          ),
        })),
    }),
    {
      name: 'treatment-sessions',
    }
  )
);