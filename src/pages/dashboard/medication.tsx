import { useState } from 'react';
import { useMedicationStore } from '@/lib/store/medication';
import { MedicationCalendar } from '@/components/medication/medication-calendar';
import { MedicationList } from '@/components/medication/medication-list';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { NewMedicationForm } from '@/components/medication/new-medication-form';
import { Plus } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

export function MedicationPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isNewMedicationModalOpen, setIsNewMedicationModalOpen] = useState(false);
  const getSchedulesByMonth = useMedicationStore((state) => state.getSchedulesByMonth);

  const schedules = getSchedulesByMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const handlePreviousMonth = () => {
    setCurrentDate((date) => subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((date) => addMonths(date, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Medication Schedule</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track patient medication schedules
          </p>
        </div>
        <Button
          onClick={() => setIsNewMedicationModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handlePreviousMonth}>
            Previous
          </Button>
          <h2 className="text-lg font-medium text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" onClick={handleNextMonth}>
            Next
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <MedicationCalendar
            schedules={schedules}
            currentDate={currentDate}
          />
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <MedicationList
            schedules={schedules}
            currentDate={currentDate}
          />
        </div>
      </div>

      <Modal
        isOpen={isNewMedicationModalOpen}
        onClose={() => setIsNewMedicationModalOpen(false)}
        title="Add New Medication Schedule"
      >
        <NewMedicationForm onClose={() => setIsNewMedicationModalOpen(false)} />
      </Modal>
    </div>
  );
}