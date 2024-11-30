import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDutyRosterStore } from '@/lib/store/duty-roster';
import { useStaffStore } from '@/lib/store/staff';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';

export function DutyRosterCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const rosters = useDutyRosterStore((state) => state.rosters);
  const staff = useStaffStore((state) => state.staff);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate((date) => subMonths(date, 1));
  };

  const nextMonth = () => {
    setCurrentDate((date) => addMonths(date, 1));
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'Morning':
        return 'bg-blue-100 text-blue-800';
      case 'Evening':
        return 'bg-purple-100 text-purple-800';
      case 'Night':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="border-r px-4 py-2 text-center text-sm font-medium text-gray-900 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dayRosters = rosters.filter((roster) =>
              isSameDay(new Date(roster.date), day)
            );

            return (
              <div
                key={day.toString()}
                className="min-h-[120px] border-b border-r p-2 last:border-r-0"
              >
                <div className="text-sm font-medium text-gray-900">
                  {format(day, 'd')}
                </div>
                <div className="mt-1 space-y-1">
                  {dayRosters.map((roster) => {
                    const staffMember = staff.find((s) => s.id === roster.staffId);
                    return (
                      <div
                        key={roster.id}
                        className={`rounded-md px-2 py-1 text-xs ${getShiftColor(roster.shift)}`}
                      >
                        <div className="font-medium">{staffMember?.name}</div>
                        <div>{roster.shift}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}