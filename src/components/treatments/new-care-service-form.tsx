import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { careServiceSchema } from '@/lib/types/treatment';
import { useTreatmentStore } from '@/lib/store/treatment';
import { toast } from 'sonner';

interface NewCareServiceFormProps {
  onClose: () => void;
}

export function NewCareServiceForm({ onClose }: NewCareServiceFormProps) {
  const addCareService = useTreatmentStore((state) => state.addCareService);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(careServiceSchema),
    defaultValues: {
      name: '',
      costPerSession: 0,
      description: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      addCareService(data);
      toast.success('Care service added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add care service. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Service Name *</Label>
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
            placeholder="Enter service description..."
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
          {isSubmitting ? 'Adding Service...' : 'Add Service'}
        </Button>
      </div>
    </form>
  );
}