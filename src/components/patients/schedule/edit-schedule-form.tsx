import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { scheduleSchema } from '@/lib/types/schedule';
import { useScheduleStore } from '@/lib/store/schedule';
import { toast } from 'sonner';
import { PatientSchedule } from '@/lib/types/schedule';

interface EditScheduleFormProps {
  schedule: PatientSchedule;
  onClose: () => void;
}

const timeSlots = Array.from({ length: 18 }, (_, i) => {
  const hour = i + 6;
  return {
    value: `${hour.toString().padStart(2, '0')}:00`,
    label: `${hour.toString().padStart(2, '0')}:00`,
  };
});

export function EditScheduleForm({ schedule, onClose }: EditScheduleFormProps) {
  const updateSchedule = useScheduleStore((state) => state.updateSchedule);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      ...schedule,
    },
  });

  const recurring = watch('recurring');

  const onSubmit = async (data: any) => {
    try {
      updateSchedule(schedule.id, data);
      toast.success('Schedule updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update schedule. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="dayOfWeek">Day of Week *</Label>
          <Select
            id="dayOfWeek"
            {...register('dayOfWeek')}
            options={[
              { value: 'Monday', label: 'Monday' },
              { value: 'Tuesday', label: 'Tuesday' },
              { value: 'Wednesday', label: 'Wednesday' },
              { value: 'Thursday', label: 'Thursday' },
              { value: 'Friday', label: 'Friday' },
              { value: 'Saturday', label: 'Saturday' },
              { value: 'Sunday', label: 'Sunday' },
            ]}
            error={errors.dayOfWeek?.message}
          />
        </div>

        <div>
          <Label htmlFor="timeSlot">Time Slot *</Label>
          <Select
            id="timeSlot"
            {...register('timeSlot')}
            options={timeSlots}
            error={errors.timeSlot?.message}
          />
        </div>

        <div>
          <Label htmlFor="shift">Shift *</Label>
          <Select
            id="shift"
            {...register('shift')}
            options={[
              { value: 'Morning', label: 'Morning (6:00 - 14:00)' },
              { value: 'Evening', label: 'Evening (14:00 - 22:00)' },
              { value: 'Night', label: 'Night (22:00 - 6:00)' },
            ]}
            error={errors.shift?.message}
          />
        </div>

        <div>
          <Label htmlFor="machineNumber">Machine Number *</Label>
          <Input
            id="machineNumber"
            {...register('machineNumber')}
            error={errors.machineNumber?.message}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            {...register('notes')}
            placeholder="Any special instructions or notes"
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('recurring')}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">Recurring Schedule</span>
          </label>
        </div>

        <div>
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate')}
            error={errors.startDate?.message}
          />
        </div>

        {!recurring && (
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              {...register('endDate')}
              error={errors.endDate?.message}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}