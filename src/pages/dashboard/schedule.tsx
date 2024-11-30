import { Calendar } from '@/components/schedule/calendar';
import { ScheduleList } from '@/components/schedule/schedule-list';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { NewScheduleForm } from '@/components/schedule/new-schedule-form';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function SchedulePage() {
  const [isNewScheduleModalOpen, setIsNewScheduleModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Treatment Schedule</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage patient treatment schedules and machine allocations
          </p>
        </div>
        <Button
          onClick={() => setIsNewScheduleModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <Calendar />
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <ScheduleList />
        </div>
      </div>

      <Modal
        isOpen={isNewScheduleModalOpen}
        onClose={() => setIsNewScheduleModalOpen(false)}
        title="Add Treatment Schedule"
      >
        <NewScheduleForm onClose={() => setIsNewScheduleModalOpen(false)} />
      </Modal>
    </div>
  );
}