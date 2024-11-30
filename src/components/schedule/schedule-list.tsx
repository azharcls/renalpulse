import { useState } from 'react';
import { useScheduleStore } from '@/lib/store/schedule';
import { usePatientStore } from '@/lib/store/patient';
import { format } from 'date-fns';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ScheduleList() {
  const schedules = useScheduleStore((state) => state.schedules);
  const patients = usePatientStore((state) => state.patients);
  const [selectedShift, setSelectedShift] = useState<string>('all');

  const filteredSchedules = schedules.filter((schedule) =>
    selectedShift === 'all' ? true : schedule.shift === selectedShift
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Treatment Sessions</h2>
        <div className="w-48">
          <Label htmlFor="shift-filter">Filter by Shift</Label>
          <Select
            id="shift-filter"
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            options={[
              { value: 'all', label: 'All Shifts' },
              { value: 'Morning', label: 'Morning' },
              { value: 'Evening', label: 'Evening' },
              { value: 'Night', label: 'Night' },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredSchedules.map((schedule) => {
          const patient = patients.find((p) => p.id === schedule.patientId);
          return (
            <div
              key={schedule.id}
              className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{patient?.name}</h3>
                  <p className="text-sm text-gray-500">{patient?.icNumber}</p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    schedule.shift === 'Morning'
                      ? 'bg-blue-100 text-blue-800'
                      : schedule.shift === 'Evening'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {schedule.shift}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Day:</span>{' '}
                  <span className="font-medium">{schedule.dayOfWeek}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>{' '}
                  <span className="font-medium">{schedule.timeSlot}</span>
                </div>
                <div>
                  <span className="text-gray-500">Machine:</span>{' '}
                  <span className="font-medium">{schedule.machineNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Start Date:</span>{' '}
                  <span className="font-medium">
                    {format(new Date(schedule.startDate), 'dd/MM/yyyy')}
                  </span>
                </div>
              </div>
              {schedule.notes && (
                <p className="mt-2 text-sm text-gray-500">{schedule.notes}</p>
              )}
            </div>
          );
        })}
        {filteredSchedules.length === 0 && (
          <p className="text-center text-gray-500">No schedules found.</p>
        )}
      </div>
    </div>
  );
}