import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ClinicalDataProps {
  register: any;
  errors: any;
}

export function ClinicalData({ register, errors }: ClinicalDataProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Clinical Data</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Input id="diagnosis" {...register('clinicalData.diagnosis')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookingDate">Booking Date *</Label>
          <Input
            id="bookingDate"
            type="date"
            {...register('clinicalData.bookingDate', {
              required: 'Booking date is required',
            })}
            error={errors.clinicalData?.bookingDate?.message}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="coMorbidCondition">CO MORBID CONDITION</Label>
          <Textarea
            id="coMorbidCondition"
            {...register('clinicalData.coMorbidCondition')}
            placeholder="Enter types and duration..."
          />
        </div>
      </div>
    </div>
  );
}