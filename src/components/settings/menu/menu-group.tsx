import { useState } from 'react';
import { MenuGroup as MenuGroupType, MenuRole } from '@/lib/types/menu';
import { useMenuStore } from '@/lib/store/menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, GripVertical, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { MenuItem } from './menu-item';
import { SortableItem } from './sortable-item';

interface MenuGroupProps {
  group: MenuGroupType;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const roleOptions: { value: MenuRole; label: string }[] = [
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
];

export function MenuGroup({ group, onMoveUp, onMoveDown, isFirst, isLast }: MenuGroupProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [title, setTitle] = useState(group.title);
  const [showRoles, setShowRoles] = useState(false);
  const { updateGroupTitle, deleteGroup, updateGroupRoles, updateItemOrder } = useMenuStore();

  const handleSave = () => {
    if (title.trim()) {
      updateGroupTitle(group.id, title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this menu group?')) {
      deleteGroup(group.id);
    }
  };

  const toggleRole = (role: MenuRole) => {
    const newRoles = group.roles.includes(role)
      ? group.roles.filter(r => r !== role)
      : [...group.roles, role];
    if (newRoles.length > 0) {
      updateGroupRoles(group.id, newRoles);
    }
  };

  return (
    <SortableItem id={group.id}>
      <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="cursor-move">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-48"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSave();
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Save
                </Button>
              </div>
            ) : (
              <h3 className="text-lg font-medium text-gray-900">{group.title}</h3>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRoles(!showRoles)}
              className={`text-gray-600 hover:text-teal-600 ${showRoles ? 'bg-teal-50' : ''}`}
            >
              <Shield className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <div className="flex flex-col space-y-1">
              <Button
                variant="outline"
                size="sm"
                onClick={onMoveUp}
                disabled={isFirst}
              >
                ↑
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onMoveDown}
                disabled={isLast}
              >
                ↓
              </Button>
            </div>
          </div>
        </div>

        {showRoles && (
          <div className="mt-2 space-x-2 border-t border-gray-100 pt-2">
            {roleOptions.map((role) => (
              <Button
                key={role.value}
                variant="outline"
                size="sm"
                onClick={() => toggleRole(role.value)}
                className={`${
                  group.roles.includes(role.value)
                    ? 'bg-teal-50 text-teal-600 border-teal-200'
                    : ''
                }`}
              >
                {role.label}
              </Button>
            ))}
          </div>
        )}

        {isExpanded && (
          <div className="mt-4 space-y-2">
            {group.items
              .sort((a, b) => a.order - b.order)
              .map((item, index) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  groupId={group.id}
                  isFirst={index === 0}
                  isLast={index === group.items.length - 1}
                  onMoveUp={() => {
                    if (index > 0) {
                      const prevItem = group.items[index - 1];
                      updateItemOrder(group.id, item.id, prevItem.order);
                      updateItemOrder(group.id, prevItem.id, item.order);
                    }
                  }}
                  onMoveDown={() => {
                    if (index < group.items.length - 1) {
                      const nextItem = group.items[index + 1];
                      updateItemOrder(group.id, item.id, nextItem.order);
                      updateItemOrder(group.id, nextItem.id, item.order);
                    }
                  }}
                />
              ))}
          </div>
        )}
      </div>
    </SortableItem>
  );
}