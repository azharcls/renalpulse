import { useState } from 'react';
import { MenuItem as MenuItemType, MenuRole } from '@/lib/types/menu';
import { useMenuStore } from '@/lib/store/menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, GripVertical, Shield } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  groupId: string;
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

export function MenuItem({ item, groupId, onMoveUp, onMoveDown, isFirst, isLast }: MenuItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [name, setName] = useState(item.name);
  const { updateItemName, deleteItem, updateItemRoles } = useMenuStore();

  const handleSave = () => {
    if (name.trim()) {
      updateItemName(groupId, item.id, name);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      deleteItem(groupId, item.id);
    }
  };

  const toggleRole = (role: MenuRole) => {
    const newRoles = item.roles.includes(role)
      ? item.roles.filter(r => r !== role)
      : [...item.roles, role];
    if (newRoles.length > 0) {
      updateItemRoles(groupId, item.id, newRoles);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-2">
        <div className="flex items-center space-x-2">
          <div className="cursor-move">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <span className="text-sm font-medium">{item.name}</span>
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
        <div className="ml-6 space-x-2 border-l border-gray-200 pl-2">
          {roleOptions.map((role) => (
            <Button
              key={role.value}
              variant="outline"
              size="sm"
              onClick={() => toggleRole(role.value)}
              className={`${
                item.roles.includes(role.value)
                  ? 'bg-teal-50 text-teal-600 border-teal-200'
                  : ''
              }`}
            >
              {role.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}