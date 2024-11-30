import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { glPanelSchema } from '@/lib/types/gl-panel';
import { useGLPanelStore } from '@/lib/store/gl-panel';
import { usePanelStore } from '@/lib/store/panel';
import { usePatientStore } from '@/lib/store/patient';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface NewGLPanelFormProps {
  patientId: string;
  onClose: () => void;
}

const unitOptions = [
  { value: 'tablets', label: 'Tablets' },
  { value: 'capsules', label: 'Capsules' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'mg', label: 'Milligrams (mg)' },
  { value: 'g', label: 'Grams (g)' },
  { value: 'units', label: 'Units' },
];

export function NewGLPanelForm({ patientId, onClose }: NewGLPanelFormProps) {
  const addGLPanel = useGLPanelStore((state) => state.addGLPanel);
  const panels = usePanelStore((state) => state.panels);
  const patient = usePatientStore((state) => 
    state.patients.find(p => p.id === patientId)
  );
  const [glLetter, setGLLetter] = useState<File | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);

  const availablePanels = panels.filter(panel => 
    patient?.panelCoverage.includes(panel.name)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(glPanelSchema),
    defaultValues: {
      hdCoverage: {
        amountPerSession: 0,
        maxSessions: undefined,
      },
      medications: [{ name: '', amount: 0, volume: 0, unit: '' }],
    },
  });

  const medications = watch('medications');

  const addMedication = () => {
    setValue('medications', [...medications, { name: '', amount: 0, volume: 0, unit: '' }]);
  };

  const removeMedication = (index: number) => {
    setValue(
      'medications',
      medications.filter((_: any, i: number) => i !== index)
    );
  };

  const onSubmit = async (data: any) => {
    try {
      // Convert files to data URLs
      const documentPromises = [];

      if (glLetter) {
        documentPromises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ glLetter: reader.result });
            reader.readAsDataURL(glLetter);
          })
        );
      }

      if (supportingDocs.length > 0) {
        const supportingDocsPromise = Promise.all(
          supportingDocs.map(
            (file) =>
              new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
              })
          )
        ).then((results) => ({ supportingDocs: results }));
        documentPromises.push(supportingDocsPromise);
      }

      const [glLetterData, supportingDocsData] = await Promise.all(documentPromises);

      const glPanelData = {
        ...data,
        patientId,
        hdCoverage: {
          amountPerSession: parseFloat(data.hdCoverage.amountPerSession),
          maxSessions: data.hdCoverage.maxSessions ? parseInt(data.hdCoverage.maxSessions) : undefined,
        },
        medications: data.medications.map((med: any) => ({
          name: med.name,
          amount: parseFloat(med.amount),
          volume: parseFloat(med.volume),
          unit: med.unit,
        })),
        documents: {
          glLetter: glLetterData?.glLetter,
          supportingDocs: supportingDocsData?.supportingDocs,
        },
      };

      addGLPanel(glPanelData);
      toast.success('GL Panel updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update GL Panel. Please try again.');
    }
  };

  if (availablePanels.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600 mb-4">
          No panels are currently registered for this patient.
        </p>
        <p className="text-sm text-gray-500">
          Please add panels to the patient's profile before updating GL Panel details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="panelName">Panel Name *</Label>
          <Select
            id="panelName"
            {...register('panelName')}
            options={availablePanels.map((panel) => ({
              value: panel.name,
              label: panel.name,
            }))}
            error={errors.panelName?.message}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">HD Coverage</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hdAmountPerSession">Amount per Session (RM) *</Label>
              <Input
                id="hdAmountPerSession"
                type="number"
                step="0.01"
                {...register('hdCoverage.amountPerSession')}
                error={errors.hdCoverage?.amountPerSession?.message}
              />
            </div>
            <div>
              <Label htmlFor="hdMaxSessions">Maximum Sessions</Label>
              <Input
                id="hdMaxSessions"
                type="number"
                {...register('hdCoverage.maxSessions')}
                error={errors.hdCoverage?.maxSessions?.message}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Medications</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedication}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
          <div className="space-y-4">
            {medications.map((_, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Medication Name *</Label>
                    <Input
                      {...register(`medications.${index}.name`)}
                      error={errors.medications?.[index]?.name?.message}
                    />
                  </div>
                  <div>
                    <Label>Amount per Unit (RM) *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register(`medications.${index}.amount`)}
                      error={errors.medications?.[index]?.amount?.message}
                    />
                  </div>
                  <div>
                    <Label>Volume/Quantity *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register(`medications.${index}.volume`)}
                      error={errors.medications?.[index]?.volume?.message}
                    />
                  </div>
                  <div>
                    <Label>Unit *</Label>
                    <Select
                      {...register(`medications.${index}.unit`)}
                      options={unitOptions}
                      error={errors.medications?.[index]?.unit?.message}
                    />
                  </div>
                </div>
                {medications.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMedication(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="effectiveDate">Effective Date *</Label>
          <Input
            id="effectiveDate"
            type="date"
            {...register('effectiveDate')}
            error={errors.effectiveDate?.message}
          />
        </div>

        <div>
          <Label htmlFor="expiryDate">Expiry Date *</Label>
          <Input
            id="expiryDate"
            type="date"
            {...register('expiryDate')}
            error={errors.expiryDate?.message}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Add any additional notes..."
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Documents</h4>
          <div className="space-y-4">
            <div>
              <Label>GL Letter</Label>
              <FileUpload
                accept=".pdf,.doc,.docx"
                value={glLetter}
                onChange={(file) => {
                  setGLLetter(file);
                  register('documents.glLetter').onChange({
                    target: { value: file },
                  });
                }}
              />
            </div>

            <div>
              <Label>Supporting Documents</Label>
              <FileUpload
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                value={supportingDocs}
                onChange={(files) => {
                  setSupportingDocs(Array.isArray(files) ? files : [files]);
                  register('documents.supportingDocs').onChange({
                    target: { value: files },
                  });
                }}
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
          {isSubmitting ? 'Updating...' : 'Update GL Panel'}
        </Button>
      </div>
    </form>
  );
}