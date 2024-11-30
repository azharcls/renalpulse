import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DutyRosterCalendar } from '@/components/duty-roster/calendar';
import { NewDutyRosterForm } from '@/components/duty-roster/new-duty-roster-form';

export function DutyRosterPage() {
  const [isNewRosterModalOpen, setIsNewRosterModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Duty Roster</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage staff schedules and working hours
          </p>
        </div>
        <Button
          onClick={() => setIsNewRosterModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <DutyRosterCalendar />
      </div>

      <Modal
        isOpen={isNewRosterModalOpen}
        onClose={() => setIsNewRosterModalOpen(false)}
        title="Add New Schedule"
      >
        <NewDutyRosterForm onClose={() => setIsNewRosterModalOpen(false)} />
      </Modal>
    </div>
  );
}