import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/lib/store/settings';
import { shiftDefinitionSchema } from '@/lib/types/settings';
import { toast } from 'sonner';

interface NewShiftFormProps {
  onClose: () => void;
}

export function NewShiftForm({ onClose }: NewShiftFormProps) {
  const addShift = useSettingsStore((state) => state.addShift);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shiftDefinitionSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      addShift(data);
      toast.success('Shift added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add shift');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Shift Name *</Label>
          <Input
            id="name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>

        <div>
          <Label htmlFor="startTime">Start Time *</Label>
          <Input
            id="startTime"
            type="time"
            {...register('startTime')}
            error={errors.startTime?.message}
          />
        </div>

        <div>
          <Label htmlFor="endTime">End Time *</Label>
          <Input
            id="endTime"
            type="time"
            {...register('endTime')}
            error={errors.endTime?.message}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            {...register('isActive')}
            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <Label htmlFor="isActive">Active</Label>
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
          {isSubmitting ? 'Adding...' : 'Add Shift'}
        </Button>
      </div>
    </form>
  );
}