import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/ui/file-upload';
import { useState } from 'react';

interface EmergencyContactProps {
  register: any;
  errors: any;
}

export function EmergencyContact({ register, errors }: EmergencyContactProps) {
  const [photo, setPhoto] = useState<File | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Emergency Contact</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="emergencyName">Name</Label>
          <Input id="emergencyName" {...register('emergencyContact.name')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyIC">Identification Number</Label>
          <Input id="emergencyIC" {...register('emergencyContact.identificationNumber')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Phone Number</Label>
          <Input id="emergencyPhone" {...register('emergencyContact.phone')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyRelation">Relation</Label>
          <Input id="emergencyRelation" {...register('emergencyContact.relation')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyOccupation">Occupation</Label>
          <Input id="emergencyOccupation" {...register('emergencyContact.occupation')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyEmail">Email</Label>
          <Input
            id="emergencyEmail"
            type="email"
            {...register('emergencyContact.email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.emergencyContact?.email?.message}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="emergencyAddress">Address</Label>
          <Input id="emergencyAddress" {...register('emergencyContact.address')} />
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Photo</Label>
          <FileUpload
            accept="image/*"
            value={photo}
            onChange={(file) => {
              setPhoto(file);
              register('emergencyContact.photo').onChange({
                target: { value: file },
              });
            }}
            error={errors.emergencyContact?.photo?.message}
          />
        </div>
      </div>
    </div>
  );
}