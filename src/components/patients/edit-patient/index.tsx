import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PatientInfo } from '../new-patient/patient-info';
import { EmergencyContact } from '../new-patient/emergency-contact';
import { SerologyData } from '../new-patient/serology-data';
import { ClinicalData } from '../new-patient/clinical-data';
import { DialysisData } from '../new-patient/dialysis-data';
import { patientSchema } from '@/lib/validations/patient';
import { usePatientStore } from '@/lib/store/patient';
import { Patient } from '@/lib/types/patient';

interface EditPatientFormProps {
  patient: Patient;
  onClose: () => void;
}

export function EditPatientForm({ patient, onClose }: EditPatientFormProps) {
  const updatePatient = usePatientStore((state) => state.updatePatient);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: patient.name,
      identificationNumber: patient.icNumber,
      gender: patient.gender.toLowerCase(),
      status: patient.status,
      email: patient.email || '',
      phone: patient.contactNumber || '',
      address: patient.address || '',
      panels: patient.panelCoverage || [],
      photo: patient.photo || null,
      emergencyContact: {
        name: patient.emergencyContact.name || '',
        phone: patient.emergencyContact.phone || '',
        relation: patient.emergencyContact.relationship || '',
        photo: patient.emergencyContact.photo || null,
      },
      serologyData: patient.serologyData || {
        hepBSurfaceAntigen: 'negative',
        hepBSurfaceAntibody: 'negative',
        antiHCV: 'negative',
        hiv: 'negative',
        vdrl: 'negative',
      },
      clinicalData: patient.clinicalData || {
        diagnosis: '',
        bookingDate: new Date().toISOString().split('T')[0],
        coMorbidCondition: '',
      },
      dialysisData: patient.dialysisData || {
        firstHDAt: '',
        startDate: '',
        vascularAccess: 'avf',
        fistulaDoneBy: '',
        handSide: 'left',
      },
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Convert File objects to data URLs
      const photoPromises = [];
      
      if (data.photo instanceof File) {
        photoPromises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(data.photo);
          })
        );
      }

      if (data.emergencyContact?.photo instanceof File) {
        photoPromises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(data.emergencyContact.photo);
          })
        );
      }

      const [patientPhoto, emergencyContactPhoto] = await Promise.all(photoPromises);

      const updatedPatient = {
        ...patient,
        name: data.name,
        icNumber: data.identificationNumber,
        gender: data.gender || 'Unknown',
        panelCoverage: data.panels?.filter(Boolean) || [],
        status: data.status,
        contactNumber: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        photo: patientPhoto as string | undefined || patient.photo,
        emergencyContact: {
          name: data.emergencyContact?.name || '',
          relationship: data.emergencyContact?.relation || '',
          phone: data.emergencyContact?.phone || '',
          photo: emergencyContactPhoto as string | undefined || patient.emergencyContact.photo,
        },
        serologyData: {
          hepBSurfaceAntigen: data.serologyData?.hepBSurfaceAntigen || '',
          hepBSurfaceAntibody: data.serologyData?.hepBSurfaceAntibody || '',
          antiHCV: data.serologyData?.antiHCV || '',
          hiv: data.serologyData?.hiv || '',
          vdrl: data.serologyData?.vdrl || '',
        },
        clinicalData: {
          diagnosis: data.clinicalData?.diagnosis || '',
          bookingDate: data.clinicalData?.bookingDate || '',
          coMorbidCondition: data.clinicalData?.coMorbidCondition || '',
        },
        dialysisData: {
          firstHDAt: data.dialysisData?.firstHDAt || '',
          startDate: data.dialysisData?.startDate || '',
          vascularAccess: data.dialysisData?.vascularAccess || '',
          fistulaDoneBy: data.dialysisData?.fistulaDoneBy || '',
          handSide: data.dialysisData?.handSide || '',
          doctorMemo: data.dialysisData?.doctorMemo || '',
          patientId: data.dialysisData?.patientId || '',
        },
      };

      updatePatient(patient.id, updatedPatient);
      toast.success('Patient details updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update patient details. Please try again.');
    }
  };

  return (
    <div className="max-h-[calc(100vh-16rem)] overflow-y-auto px-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <PatientInfo register={register} errors={errors} watch={watch} setValue={setValue} />
          <EmergencyContact register={register} errors={errors} watch={watch} />
          <SerologyData register={register} />
          <ClinicalData register={register} errors={errors} />
          <DialysisData register={register} errors={errors} />
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
    </div>
  );
}