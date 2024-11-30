import { MedicationSchedule } from '@/lib/types/medication';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useMedicationStore } from '@/lib/store/medication';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { useState } from 'react';
import { UpdateStatusForm } from './update-status-form';

interface MedicationCalendarProps {
  schedules: MedicationSchedule[];
  currentDate: Date;
}

export function MedicationCalendar({ schedules, currentDate }: MedicationCalendarProps) {
  const [selectedDetail, setSelectedDetail] = useState<{
    scheduleId: string;
    detailId: string;
    date: string;
    status: string;
  } | null>(null);
  const user = useAuthStore((state) => state.user);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'given':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const daySchedules = schedules.flatMap((schedule) =>
            schedule.scheduleDetails.filter((detail) =>
              isSameDay(new Date(detail.date), day)
            ).map((detail) => ({
              ...detail,
              scheduleName: schedule.medicationName,
              dosage: schedule.dosage,
              scheduleId: schedule.id,
            }))
          );

          return (
            <div
              key={day.toString()}
              className="min-h-[100px] bg-white p-2"
            >
              <div className="text-right text-sm text-gray-500">
                {format(day, 'd')}
              </div>
              <div className="mt-2 space-y-1">
                {daySchedules.map((detail) => (
                  <Button
                    key={detail.id}
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start text-left text-xs ${getStatusColor(detail.status)}`}
                    onClick={() => setSelectedDetail({
                      scheduleId: detail.scheduleId,
                      detailId: detail.id,
                      date: detail.date,
                      status: detail.status,
                    })}
                  >
                    <div className="truncate">
                      <div className="font-medium">{detail.scheduleName}</div>
                      <div className="text-xs">{detail.dosage}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
        title="Update Medication Status"
      >
        {selectedDetail && (
          <UpdateStatusForm
            scheduleId={selectedDetail.scheduleId}
            detailId={selectedDetail.detailId}
            currentStatus={selectedDetail.status}
            date={selectedDetail.date}
            userId={user?.id || ''}
            userName={user?.name || user?.email || ''}
            onClose={() => setSelectedDetail(null)}
          />
        )}
      </Modal>
    </div>
  );
}