import { useMenuStore } from '@/lib/store/menu';
import { MenuGroup } from './menu-group';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export function MenuSettings() {
  const groups = useMenuStore((state) => state.groups);
  const updateGroupOrder = useMenuStore((state) => state.updateGroupOrder);
  const resetToDefault = useMenuStore((state) => state.resetToDefault);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = groups.findIndex(group => group.id === active.id);
      const newIndex = groups.findIndex(group => group.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const oldOrder = groups[oldIndex].order;
        const newOrder = groups[newIndex].order;
        updateGroupOrder(active.id as string, newOrder);
        updateGroupOrder(over.id as string, oldOrder);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Menu Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            Customize the sidebar menu structure and permissions. Use the shield icon to manage role access.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            if (confirm('Are you sure you want to reset the menu to default settings?')) {
              resetToDefault();
            }
          }}
          className="text-gray-600 hover:text-teal-600"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
      </div>

      <DndContext 
        sensors={sensors}
        onDragEnd={handleDragEnd} 
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={groups.map(g => g.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {groups
              .sort((a, b) => a.order - b.order)
              .map((group, index) => (
                <MenuGroup
                  key={group.id}
                  group={group}
                  isFirst={index === 0}
                  isLast={index === groups.length - 1}
                  onMoveUp={() => {
                    if (index > 0) {
                      const prevGroup = groups[index - 1];
                      updateGroupOrder(group.id, prevGroup.order);
                      updateGroupOrder(prevGroup.id, group.order);
                    }
                  }}
                  onMoveDown={() => {
                    if (index < groups.length - 1) {
                      const nextGroup = groups[index + 1];
                      updateGroupOrder(group.id, nextGroup.order);
                      updateGroupOrder(nextGroup.id, group.order);
                    }
                  }}
                />
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}