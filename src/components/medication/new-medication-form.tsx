import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { medicationScheduleSchema } from '@/lib/types/medication';
import { useMedicationStore } from '@/lib/store/medication';
import { useAuthStore } from '@/lib/store/auth';
import { toast } from 'sonner';
import { useState } from 'react';

interface NewMedicationFormProps {
  onClose: () => void;
}

export function NewMedicationForm({ onClose }: NewMedicationFormProps) {
  const addSchedule = useMedicationStore((state) => state.addSchedule);
  const user = useAuthStore((state) => state.user);
  const [showCustomFrequency, setShowCustomFrequency] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(medicationScheduleSchema),
  });

  const frequency = watch('frequency');

  const onSubmit = async (data: any) => {
    try {
      addSchedule({
        ...data,
        patientId: user?.id || '',
        createdBy: user?.id || '',
      });
      toast.success('Medication schedule added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add medication schedule');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <Label htmlFor="medicationName">Medication Name *</Label>
          <Input
            id="medicationName"
            {...register('medicationName')}
            error={errors.medicationName?.message}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="dosage">Dosage *</Label>
          <Input
            id="dosage"
            {...register('dosage')}
            error={errors.dosage?.message}
          />
        </div>

        <div>
          <Label htmlFor="frequency">Frequency *</Label>
          <Select
            id="frequency"
            {...register('frequency')}
            options={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'custom', label: 'Custom' },
            ]}
            onChange={(e) => {
              register('frequency').onChange(e);
              setShowCustomFrequency(e.target.value === 'custom');
            }}
            error={errors.frequency?.message}
          />
        </div>

        {showCustomFrequency && (
          <div>
            <Label htmlFor="customFrequency">Days Between Doses *</Label>
            <Input
              id="customFrequency"
              type="number"
              min="1"
              {...register('customFrequency')}
              error={errors.customFrequency?.message}
            />
          </div>
        )}

        <div>
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate')}
            error={errors.startDate?.message}
          />
        </div>

        <div>
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            {...register('endDate')}
            error={errors.endDate?.message}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
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
          {isSubmitting ? 'Adding...' : 'Add Medication'}
        </Button>
      </div>
    </form>
  );
}