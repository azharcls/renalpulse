import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { useSettingsStore } from '@/lib/store/settings';
import { companyProfileSchema } from '@/lib/types/settings';
import { toast } from 'sonner';
import { useState } from 'react';

export function CompanyProfileSettings() {
  const { companyProfile, updateCompanyProfile } = useSettingsStore();
  const [logo, setLogo] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: companyProfile,
  });

  const onSubmit = async (data: any) => {
    try {
      let logoUrl = companyProfile.logo;
      if (logo) {
        const reader = new FileReader();
        logoUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(logo);
        });
      }

      updateCompanyProfile({ ...data, logo: logoUrl });
      toast.success('Company profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update company profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <Label>Company Logo</Label>
          <FileUpload
            accept="image/*"
            value={logo}
            onChange={setLogo}
            error={errors.logo?.message}
          />
        </div>

        <div>
          <Label htmlFor="name">Company Name *</Label>
          <Input
            id="name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">Registration Number *</Label>
          <Input
            id="registrationNumber"
            {...register('registrationNumber')}
            error={errors.registrationNumber?.message}
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

        <div className="col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            {...register('address')}
            error={errors.address?.message}
          />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            {...register('website')}
            error={errors.website?.message}
          />
        </div>

        <div>
          <Label htmlFor="taxId">Tax ID</Label>
          <Input
            id="taxId"
            {...register('taxId')}
            error={errors.taxId?.message}
          />
        </div>
      </div>

      <div className="flex justify-end">
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