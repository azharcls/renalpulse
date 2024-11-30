import { MedicationSchedule } from '@/lib/types/medication';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useMedicationStore } from '@/lib/store/medication';
import { toast } from 'sonner';

interface MedicationListProps {
  schedules: MedicationSchedule[];
  currentDate: Date;
}

export function MedicationList({ schedules, currentDate }: MedicationListProps) {
  const deleteSchedule = useMedicationStore((state) => state.deleteSchedule);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this medication schedule?')) {
      deleteSchedule(id);
      toast.success('Medication schedule deleted successfully');
    }
  };

  if (schedules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No medication schedules found for this month
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Medication List</h2>
      <div className="divide-y divide-gray-200">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {schedule.medicationName}
                </h3>
                <p className="text-sm text-gray-500">{schedule.dosage}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(schedule.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Frequency:</span>{' '}
                {schedule.frequency}
                {schedule.customFrequency && ` (Every ${schedule.customFrequency} days)`}
              </div>
              <div>
                <span className="font-medium">Created:</span>{' '}
                {format(new Date(schedule.createdAt), 'PP')}
              </div>
              <div>
                <span className="font-medium">Start Date:</span>{' '}
                {format(new Date(schedule.startDate), 'PP')}
              </div>
              <div>
                <span className="font-medium">End Date:</span>{' '}
                {format(new Date(schedule.endDate), 'PP')}
              </div>
            </div>
            {schedule.notes && (
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Notes:</span> {schedule.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}