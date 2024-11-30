import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/lib/routes';
import { PatientStatus } from '@/lib/types/patient';
import { useState } from 'react';
import { usePanelStore } from '@/lib/store/panel';

interface PatientInfoProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
}

const statusOptions = [
  { value: 'On Going', label: 'On Going' },
  { value: 'Warded', label: 'Warded' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Unknown', label: 'Unknown' },
  { value: 'Ceased', label: 'Ceased' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Booking', label: 'Booking' },
];

export function PatientInfo({ register, errors, watch, setValue }: PatientInfoProps) {
  const navigate = useNavigate();
  const panels = usePanelStore((state) => state.panels);
  const panelOptions = panels.map(panel => ({
    value: panel.name,
    label: panel.name
  }));
  const selectedPanels = watch('panels') || [];
  const [photo, setPhoto] = useState<File | null>(null);

  const addPanel = () => {
    setValue('panels', [...selectedPanels, '']);
  };

  const removePanel = (index: number) => {
    setValue(
      'panels',
      selectedPanels.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-2 space-y-2">
          <Label>Photo</Label>
          <FileUpload
            accept="image/*"
            value={photo}
            onChange={(file) => {
              setPhoto(file);
              register('photo').onChange({
                target: { value: file },
              });
            }}
            error={errors.photo?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Patient Name *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Patient name is required' })}
            error={errors.name?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="identificationNumber">Identification Number *</Label>
          <Input
            id="identificationNumber"
            {...register('identificationNumber', { required: 'IC number is required' })}
            error={errors.identificationNumber?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            {...register('gender')}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            id="status"
            {...register('status', { required: 'Status is required' })}
            options={statusOptions}
            error={errors.status?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" {...register('occupation')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register('phone')} />
        </div>

        <div className="col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <Label>Panels</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigate(routes.dashboard.panel)}
              >
                Manage Panels
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPanel}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {selectedPanels.map((panel: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Select
                  {...register(`panels.${index}`)}
                  options={panelOptions}
                  error={errors.panels?.[index]?.message}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removePanel(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register('address')} />
        </div>
      </div>
    </div>
  );
}