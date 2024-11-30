import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { panelSchema } from '@/lib/validations/panel';
import { usePanelStore } from '@/lib/store/panel';
import { toast } from 'sonner';
import { useState } from 'react';

interface NewPanelFormProps {
  onClose: () => void;
}

export function NewPanelForm({ onClose }: NewPanelFormProps) {
  const addPanel = usePanelStore((state) => state.addPanel);
  const [logo, setLogo] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(panelSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      let logoUrl;
      if (logo) {
        const reader = new FileReader();
        logoUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(logo);
        });
      }

      const panelData = {
        ...data,
        logo: logoUrl,
        status: 'active',
      };

      addPanel(panelData);
      toast.success('Panel successfully added!');
      onClose();
    } catch (error) {
      toast.error('Failed to add panel. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-2">
          <Label>Panel Logo</Label>
          <FileUpload
            accept="image/*"
            value={logo}
            onChange={setLogo}
            error={errors.logo?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Panel Name *</Label>
          <Input
            id="name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select
            id="type"
            {...register('type')}
            options={[
              { value: 'insurance', label: 'Insurance' },
              { value: 'government', label: 'Government' },
              { value: 'private', label: 'Private' },
            ]}
            error={errors.type?.message}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            {...register('address')}
            error={errors.address?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber')}
            error={errors.phoneNumber?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ext">Ext</Label>
          <Input
            id="ext"
            {...register('ext')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="faxNumber">Fax Number</Label>
          <Input
            id="faxNumber"
            {...register('faxNumber')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="personInCharge">Person In Charge *</Label>
          <Input
            id="personInCharge"
            {...register('personInCharge')}
            error={errors.personInCharge?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="picContactNumber">PIC Contact Number *</Label>
          <Input
            id="picContactNumber"
            {...register('picContactNumber')}
            error={errors.picContactNumber?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="picEmail">PIC Email *</Label>
          <Input
            id="picEmail"
            type="email"
            {...register('picEmail')}
            error={errors.picEmail?.message}
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
          {isSubmitting ? 'Adding Panel...' : 'Add Panel'}
        </Button>
      </div>
    </form>
  );
}