import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { medicationStatusSchema } from '@/lib/types/medication';
import { useMedicationStore } from '@/lib/store/medication';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface UpdateStatusFormProps {
  scheduleId: string;
  detailId: string;
  currentStatus: string;
  date: string;
  userId: string;
  userName: string;
  onClose: () => void;
}

export function UpdateStatusForm({
  scheduleId,
  detailId,
  currentStatus,
  date,
  userId,
  userName,
  onClose,
}: UpdateStatusFormProps) {
  const updateScheduleStatus = useMedicationStore((state) => state.updateScheduleStatus);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(medicationStatusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      updateScheduleStatus(scheduleId, detailId, data.status, userId, data.notes);
      toast.success('Medication status updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update medication status');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">
          Update status for {format(new Date(date), 'PPP')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Select
            {...register('status')}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'given', label: 'Given' },
              { value: 'missed', label: 'Missed' },
            ]}
            error={errors.status?.message}
          />
        </div>

        <div>
          <Textarea
            {...register('notes')}
            placeholder="Add notes (optional)"
            rows={3}
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
          {isSubmitting ? 'Updating...' : 'Update Status'}
        </Button>
      </div>
    </form>
  );
}