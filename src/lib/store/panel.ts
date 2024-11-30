import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Panel } from '../types/panel';
import { mockPanels } from '../data/mock-panels';

interface PanelState {
  panels: Panel[];
  addPanel: (panel: Omit<Panel, 'id' | 'status'>) => void;
  updatePanel: (id: string, updates: Partial<Panel>) => void;
  deletePanel: (id: string) => void;
  getPanelsByType: (type: string) => Panel[];
}

export const usePanelStore = create<PanelState>()(
  persist(
    (set, get) => ({
      panels: mockPanels,
      addPanel: (panel) =>
        set((state) => ({
          panels: [
            ...state.panels,
            { ...panel, id: crypto.randomUUID(), status: 'active' },
          ],
        })),
      updatePanel: (id, updates) =>
        set((state) => ({
          panels: state.panels.map((panel) =>
            panel.id === id ? { ...panel, ...updates } : panel
          ),
        })),
      deletePanel: (id) =>
        set((state) => ({
          panels: state.panels.filter((panel) => panel.id !== id),
        })),
      getPanelsByType: (type) => {
        const panels = get().panels;
        return type === 'all' ? panels : panels.filter((panel) => panel.type === type);
      },
    }),
    {
      name: 'panel-storage',
    }
  )
);