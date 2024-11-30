import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useSettingsStore } from '@/lib/store/settings';
import { ShiftDefinition } from '@/lib/types/settings';
import { toast } from 'sonner';
import { NewShiftForm } from './shifts/new-shift-form';
import { EditShiftForm } from './shifts/edit-shift-form';

export function ShiftSettings() {
  const { shifts, deleteShift } = useSettingsStore();
  const [isNewShiftModalOpen, setIsNewShiftModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftDefinition | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteShift = (id: string) => {
    if (confirm('Are you sure you want to delete this shift?')) {
      deleteShift(id);
      toast.success('Shift deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Shift Definitions</h2>
        <Button
          onClick={() => setIsNewShiftModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Shift
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{shift.name}</h3>
              <span
                className={
                  `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    shift.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`
                }
              >
                {shift.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                Start: <span className="font-medium">{shift.startTime}</span>
              </p>
              <p>
                End: <span className="font-medium">{shift.endTime}</span>
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedShift(shift);
                  setIsEditModalOpen(true);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteShift(shift.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isNewShiftModalOpen}
        onClose={() => setIsNewShiftModalOpen(false)}
        title="Add New Shift"
      >
        <NewShiftForm onClose={() => setIsNewShiftModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Shift"
      >
        {selectedShift && (
          <EditShiftForm
            shift={selectedShift}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}