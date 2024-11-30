import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GLPanel } from '../types/gl-panel';

interface GLPanelState {
  glPanels: GLPanel[];
  addGLPanel: (glPanel: Omit<GLPanel, 'id' | 'status'>) => void;
  updateGLPanel: (id: string, updates: Partial<GLPanel>) => void;
  deleteGLPanel: (id: string) => void;
  getPatientGLPanels: (patientId: string) => GLPanel[];
}

export const useGLPanelStore = create<GLPanelState>()(
  persist(
    (set, get) => ({
      glPanels: [],
      addGLPanel: (glPanel) =>
        set((state) => ({
          glPanels: [
            ...state.glPanels,
            {
              ...glPanel,
              id: crypto.randomUUID(),
              status: new Date(glPanel.expiryDate) > new Date() ? 'active' : 'expired',
            },
          ],
        })),
      updateGLPanel: (id, updates) =>
        set((state) => ({
          glPanels: state.glPanels.map((panel) =>
            panel.id === id
              ? {
                  ...panel,
                  ...updates,
                  status:
                    updates.expiryDate && new Date(updates.expiryDate) > new Date()
                      ? 'active'
                      : 'expired',
                }
              : panel
          ),
        })),
      deleteGLPanel: (id) =>
        set((state) => ({
          glPanels: state.glPanels.filter((panel) => panel.id !== id),
        })),
      getPatientGLPanels: (patientId) => {
        return get().glPanels.filter((panel) => panel.patientId === patientId);
      },
    }),
    {
      name: 'gl-panel-storage',
    }
  )
);