import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { treatmentSchema } from '@/lib/types/treatment';
import { useTreatmentStore } from '@/lib/store/treatment';
import { toast } from 'sonner';
import { Treatment } from '@/lib/types/treatment';

interface EditTreatmentFormProps {
  treatment: Treatment;
  onClose: () => void;
}

export function EditTreatmentForm({ treatment, onClose }: EditTreatmentFormProps) {
  const updateTreatment = useTreatmentStore((state) => state.updateTreatment);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(treatmentSchema),
    defaultValues: {
      name: treatment.name,
      costPerSession: treatment.costPerSession,
      description: treatment.description,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      updateTreatment(treatment.id, data);
      toast.success('Treatment updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update treatment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Treatment Name *</Label>
          <Input
            id="name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>

        <div>
          <Label htmlFor="costPerSession">Cost per Session (RM) *</Label>
          <Input
            id="costPerSession"
            type="number"
            step="0.01"
            {...register('costPerSession')}
            error={errors.costPerSession?.message}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter treatment description..."
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
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}