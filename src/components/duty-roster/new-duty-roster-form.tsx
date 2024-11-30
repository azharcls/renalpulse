import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { dutyRosterSchema } from '@/lib/types/duty-roster';
import { useDutyRosterStore } from '@/lib/store/duty-roster';
import { useStaffStore } from '@/lib/store/staff';
import { toast } from 'sonner';

interface NewDutyRosterFormProps {
  onClose: () => void;
}

export function NewDutyRosterForm({ onClose }: NewDutyRosterFormProps) {
  const addRoster = useDutyRosterStore((state) => state.addRoster);
  const staff = useStaffStore((state) => state.staff);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(dutyRosterSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      addRoster(data);
      toast.success('Schedule added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add schedule. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="staffId">Staff Member *</Label>
          <Select
            id="staffId"
            {...register('staffId')}
            options={staff.map((s) => ({
              value: s.id,
              label: s.name,
            }))}
            error={errors.staffId?.message}
          />
        </div>

        <div>
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            {...register('date')}
            error={errors.date?.message}
          />
        </div>

        <div>
          <Label htmlFor="shift">Shift *</Label>
          <Select
            id="shift"
            {...register('shift')}
            options={[
              { value: 'Morning', label: 'Morning (6:00 AM - 2:00 PM)' },
              { value: 'Evening', label: 'Evening (2:00 PM - 10:00 PM)' },
              { value: 'Night', label: 'Night (10:00 PM - 6:00 AM)' },
            ]}
            error={errors.shift?.message}
          />
        </div>

        <div>
          <Label htmlFor="status">Status *</Label>
          <Select
            id="status"
            {...register('status')}
            options={[
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Absent', label: 'Absent' },
            ]}
            error={errors.status?.message}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Add any additional notes..."
          />
        </div>
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
          {isSubmitting ? 'Adding Schedule...' : 'Add Schedule'}
        </Button>
      </div>
    </form>
  );
}