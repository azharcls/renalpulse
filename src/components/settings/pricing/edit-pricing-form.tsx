import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSettingsStore } from '@/lib/store/settings';
import { pricingConfigSchema } from '@/lib/types/settings';
import { PricingConfig } from '@/lib/types/settings';
import { toast } from 'sonner';

interface EditPricingFormProps {
  pricing: PricingConfig;
  onClose: () => void;
}

export function EditPricingForm({ pricing, onClose }: EditPricingFormProps) {
  const updatePricing = useSettingsStore((state) => state.updatePricing);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(pricingConfigSchema),
    defaultValues: pricing,
  });

  const onSubmit = async (data: any) => {
    try {
      updatePricing(pricing.id, data);
      toast.success('Pricing configuration updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update pricing configuration');
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
          <Label htmlFor="type">Type *</Label>
          <Select
            id="type"
            {...register('type')}
            options={[
              { value: 'treatment', label: 'Treatment' },
              { value: 'care', label: 'Care Service' },
            ]}
            error={errors.type?.message}
          />
        </div>

        <div>
          <Label htmlFor="basePrice">Base Price (RM) *</Label>
          <Input
            id="basePrice"
            type="number"
            step="0.01"
            {...register('basePrice', { valueAsNumber: true })}
            error={errors.basePrice?.message}
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
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}