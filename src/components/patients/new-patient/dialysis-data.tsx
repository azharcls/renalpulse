import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { useState } from 'react';

interface DialysisDataProps {
  register: any;
  errors: any;
}

export function DialysisData({ register, errors }: DialysisDataProps) {
  const [doctorMemo, setDoctorMemo] = useState<File | null>(null);
  const [patientId, setPatientId] = useState<File | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Dialysis Data</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstHDAt">First HD at *</Label>
          <Input
            id="firstHDAt"
            {...register('dialysisData.firstHDAt', {
              required: 'First HD location is required',
            })}
            error={errors.dialysisData?.firstHDAt?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            {...register('dialysisData.startDate')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vascularAccess">Vascular Access</Label>
          <Select
            id="vascularAccess"
            {...register('dialysisData.vascularAccess')}
            options={[
              { value: 'avf', label: 'AVF' },
              { value: 'avg', label: 'AVG' },
              { value: 'catheter', label: 'Catheter' },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fistulaDoneBy">Fistula Done By</Label>
          <Input id="fistulaDoneBy" {...register('dialysisData.fistulaDoneBy')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="handSide">Hand Side</Label>
          <Select
            id="handSide"
            {...register('dialysisData.handSide')}
            options={[
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
            ]}
          />
        </div>

        <div className="col-span-2 space-y-4">
          <div className="space-y-2">
            <Label>Doctor Memo</Label>
            <FileUpload
              accept=".pdf,.doc,.docx"
              value={doctorMemo}
              onChange={(file) => {
                setDoctorMemo(file);
                register('dialysisData.doctorMemo').onChange({
                  target: { value: file },
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Patient ID</Label>
            <FileUpload
              accept="image/*,.pdf"
              value={patientId}
              onChange={(file) => {
                setPatientId(file);
                register('dialysisData.patientId').onChange({
                  target: { value: file },
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}