import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MenuItem, MenuGroup, MenuRole } from '../types/menu';
import { navigation } from '../constants/navigation';

// Convert navigation constant to MenuGroup array with IDs and roles
const initialGroups: MenuGroup[] = Object.entries(navigation).map(([key, group]) => ({
  id: key,
  title: group.title,
  items: group.items.map((item, itemIndex) => ({
    id: `${key}-${itemIndex}`,
    name: item.name,
    href: item.href,
    icon: item.icon.name,
    roles: ['superadmin', 'admin', 'staff'] as MenuRole[],
    order: itemIndex,
  })),
  order: group.order,
  roles: ['superadmin', 'admin', 'staff'] as MenuRole[],
}));

interface MenuState {
  version: number;
  groups: MenuGroup[];
  updateGroupOrder: (groupId: string, newOrder: number) => void;
  updateItemOrder: (groupId: string, itemId: string, newOrder: number) => void;
  updateGroupRoles: (groupId: string, roles: MenuRole[]) => void;
  updateItemRoles: (groupId: string, itemId: string, roles: MenuRole[]) => void;
  updateGroupTitle: (groupId: string, title: string) => void;
  updateItemName: (groupId: string, itemId: string, name: string) => void;
  deleteGroup: (groupId: string) => void;
  deleteItem: (groupId: string, itemId: string) => void;
  getVisibleGroups: (userRole: MenuRole) => MenuGroup[];
  resetToDefault: () => void;
}

const CURRENT_VERSION = 1;

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      version: CURRENT_VERSION,
      groups: initialGroups,
      updateGroupOrder: (groupId, newOrder) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId ? { ...group, order: newOrder } : group
          ),
        })),
      updateItemOrder: (groupId, itemId, newOrder) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  items: group.items.map((item) =>
                    item.id === itemId ? { ...item, order: newOrder } : item
                  ),
                }
              : group
          ),
        })),
      updateGroupRoles: (groupId, roles) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId ? { ...group, roles } : group
          ),
        })),
      updateItemRoles: (groupId, itemId, roles) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  items: group.items.map((item) =>
                    item.id === itemId ? { ...item, roles } : item
                  ),
                }
              : group
          ),
        })),
      updateGroupTitle: (groupId, title) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId ? { ...group, title } : group
          ),
        })),
      updateItemName: (groupId, itemId, name) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  items: group.items.map((item) =>
                    item.id === itemId ? { ...item, name } : item
                  ),
                }
              : group
          ),
        })),
      deleteGroup: (groupId) =>
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== groupId),
        })),
      deleteItem: (groupId, itemId) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  items: group.items.filter((item) => item.id !== itemId),
                }
              : group
          ),
        })),
      getVisibleGroups: (userRole) => {
        const { groups } = get();
        return groups
          .filter((group) => group.roles.includes(userRole))
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.roles.includes(userRole)),
          }))
          .sort((a, b) => a.order - b.order);
      },
      resetToDefault: () => set({ groups: initialGroups }),
    }),
    {
      name: 'menu-storage',
      version: CURRENT_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            version: CURRENT_VERSION,
            groups: initialGroups,
          };
        }
        return persistedState;
      },
    }
  )
);