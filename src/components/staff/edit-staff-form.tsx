import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { staffSchema } from '@/lib/types/staff';
import { useStaffStore } from '@/lib/store/staff';
import { toast } from 'sonner';
import { useState } from 'react';
import { Staff } from '@/lib/types/staff';

interface EditStaffFormProps {
  staff: Staff;
  onClose: () => void;
}

const positions = [
  { value: 'post_basic_nurse', label: 'Post Basic Nurse' },
  { value: 'dialysis_assistant', label: 'Dialysis Assistant' },
  { value: 'staff_nurse', label: 'Staff Nurse' },
  { value: 'admin_staff', label: 'Admin Staff' },
  { value: 'medical_officer', label: 'Medical Officer' },
  { value: 'support_staff', label: 'Cleaner/Support Staff' },
];

export function EditStaffForm({ staff, onClose }: EditStaffFormProps) {
  const updateStaff = useStaffStore((state) => state.updateStaff);
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: staff.name,
      position: staff.position,
      email: staff.email,
      phone: staff.phone,
      status: staff.status,
      schedule: staff.schedule || {
        shift: 'Morning',
        workDays: [],
      },
      emergencyContact: staff.emergencyContact,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      let photoUrl = staff.photo;
      if (photo) {
        const reader = new FileReader();
        photoUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(photo);
        });
      }

      const updatedStaff = {
        ...data,
        photo: photoUrl,
      };

      updateStaff(staff.id, updatedStaff);
      toast.success('Staff member updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update staff member. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <Label>Photo</Label>
              <FileUpload
                accept="image/*"
                value={photo}
                onChange={setPhoto}
                error={errors.photo?.message}
              />
            </div>

            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>

            <div>
              <Label htmlFor="position">Position *</Label>
              <Select
                id="position"
                {...register('position')}
                options={positions}
                error={errors.position?.message}
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                id="status"
                {...register('status')}
                options={[
                  { value: 'On Duty', label: 'On Duty' },
                  { value: 'On Leave', label: 'On Leave' },
                  { value: 'Off Duty', label: 'Off Duty' },
                ]}
                error={errors.status?.message}
              />
            </div>

            <div>
              <Label htmlFor="shift">Shift *</Label>
              <Select
                id="shift"
                {...register('schedule.shift')}
                options={[
                  { value: 'Morning', label: 'Morning' },
                  { value: 'Evening', label: 'Evening' },
                  { value: 'Night', label: 'Night' },
                ]}
                error={errors.schedule?.shift?.message}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="emergencyName">Name *</Label>
              <Input
                id="emergencyName"
                {...register('emergencyContact.name')}
                error={errors.emergencyContact?.name?.message}
              />
            </div>

            <div>
              <Label htmlFor="emergencyRelationship">Relationship *</Label>
              <Input
                id="emergencyRelationship"
                {...register('emergencyContact.relationship')}
                error={errors.emergencyContact?.relationship?.message}
              />
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Phone *</Label>
              <Input
                id="emergencyPhone"
                {...register('emergencyContact.phone')}
                error={errors.emergencyContact?.phone?.message}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="emergencyAddress">Address *</Label>
              <Input
                id="emergencyAddress"
                {...register('emergencyContact.address')}
                error={errors.emergencyContact?.address?.message}
              />
            </div>
          </div>
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