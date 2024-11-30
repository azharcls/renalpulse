import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTreatmentSessionStore } from '@/lib/store/treatment-session';
import { treatmentSessionSchema } from '@/lib/types/treatment-session';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TreatmentFormProps {
  sessionId: string;
  userId: string;
  userName: string;
}

export function TreatmentForm({ sessionId, userId, userName }: TreatmentFormProps) {
  const { getSessionById, updateSession, addLog, completeSession } = useTreatmentSessionStore();
  const session = getSessionById(sessionId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(treatmentSessionSchema),
    defaultValues: {
      machineNumber: session?.machineNumber,
      treatmentDetails: session?.treatmentDetails,
      clinicalObservations: session?.clinicalObservations,
    },
  });

  if (!session) {
    return null;
  }

  const onSubmit = async (data: any) => {
    try {
      updateSession(sessionId, {
        ...data,
        lastUpdated: new Date().toISOString(),
      });
      addLog(sessionId, userId, userName, 'Updated treatment record');
      toast.success('Treatment record updated successfully');
    } catch (error) {
      toast.error('Failed to update treatment record');
    }
  };

  const handleComplete = () => {
    if (confirm('Are you sure you want to complete this treatment session?')) {
      completeSession(sessionId);
      addLog(sessionId, userId, userName, 'Completed treatment session');
      toast.success('Treatment session completed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Treatment Record</h2>
        <p className="mt-1 text-sm text-gray-500">
          Last updated: {format(new Date(session.startTime), 'PPpp')}
        </p>
      </div>

      {/* Treatment Details */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Treatment Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="treatmentDetails.uf">UF Goal (ml)</Label>
            <Input
              id="treatmentDetails.uf"
              type="number"
              {...register('treatmentDetails.uf')}
              error={errors.treatmentDetails?.uf?.message}
            />
          </div>
          <div>
            <Label htmlFor="treatmentDetails.bfr">Blood Flow Rate (ml/min)</Label>
            <Input
              id="treatmentDetails.bfr"
              type="number"
              {...register('treatmentDetails.bfr')}
              error={errors.treatmentDetails?.bfr?.message}
            />
          </div>
          <div>
            <Label htmlFor="treatmentDetails.heparinDosage">Heparin (units)</Label>
            <Input
              id="treatmentDetails.heparinDosage"
              type="number"
              {...register('treatmentDetails.heparinDosage')}
              error={errors.treatmentDetails?.heparinDosage?.message}
            />
          </div>
          <div>
            <Label htmlFor="treatmentDetails.dialyzerType">Dialyzer Type</Label>
            <Input
              id="treatmentDetails.dialyzerType"
              {...register('treatmentDetails.dialyzerType')}
              error={errors.treatmentDetails?.dialyzerType?.message}
            />
          </div>
          <div>
            <Label htmlFor="treatmentDetails.vascularAccess">Vascular Access</Label>
            <Select
              id="treatmentDetails.vascularAccess"
              {...register('treatmentDetails.vascularAccess')}
              options={[
                { value: 'AVF', label: 'AVF' },
                { value: 'AVG', label: 'AVG' },
                { value: 'Catheter', label: 'Catheter' },
              ]}
              error={errors.treatmentDetails?.vascularAccess?.message}
            />
          </div>
        </div>
      </div>

      {/* Clinical Observations */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Clinical Observations</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Blood Pressure (Before)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Systolic"
                type="number"
                {...register('clinicalObservations.bloodPressure.before.systolic')}
                error={errors.clinicalObservations?.bloodPressure?.before?.systolic?.message}
              />
              <Input
                placeholder="Diastolic"
                type="number"
                {...register('clinicalObservations.bloodPressure.before.diastolic')}
                error={errors.clinicalObservations?.bloodPressure?.before?.diastolic?.message}
              />
            </div>
          </div>
          <div>
            <Label>Weight (kg)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Before"
                type="number"
                step="0.1"
                {...register('clinicalObservations.weight.before')}
                error={errors.clinicalObservations?.weight?.before?.message}
              />
              <Input
                placeholder="After"
                type="number"
                step="0.1"
                {...register('clinicalObservations.weight.after')}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="clinicalObservations.pulseRate">Pulse Rate (bpm)</Label>
            <Input
              id="clinicalObservations.pulseRate"
              type="number"
              {...register('clinicalObservations.pulseRate')}
              error={errors.clinicalObservations?.pulseRate?.message}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="clinicalObservations.notes">Notes</Label>
          <Textarea
            id="clinicalObservations.notes"
            {...register('clinicalObservations.notes')}
            rows={3}
          />
        </div>
      </div>

      {/* Log History */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Log History</h3>
        <div className="max-h-40 overflow-y-auto rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {session.logs.map((log, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(log.timestamp), 'PPpp')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleComplete}
          disabled={session.status === 'completed'}
        >
          Complete Session
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