import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PatientInfo } from './patient-info';
import { EmergencyContact } from './emergency-contact';
import { SerologyData } from './serology-data';
import { ClinicalData } from './clinical-data';
import { DialysisData } from './dialysis-data';
import { patientSchema } from '@/lib/validations/patient';
import { routes } from '@/lib/routes';
import { usePatientStore } from '@/lib/store/patient';

export function NewPatientForm() {
  const navigate = useNavigate();
  const addPatient = usePatientStore((state) => state.addPatient);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      status: 'Booking',
      panels: [],
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

      // Transform the form data to match the Patient type
      const patientData = {
        name: data.name,
        icNumber: data.identificationNumber,
        gender: data.gender || 'Unknown',
        panelCoverage: data.panels?.filter(Boolean) || [],
        status: data.status,
        contactNumber: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        dateOfBirth: data.dateOfBirth || '',
        photo: patientPhoto as string | undefined,
        emergencyContact: {
          name: data.emergencyContact?.name || '',
          relationship: data.emergencyContact?.relation || '',
          phone: data.emergencyContact?.phone || '',
          photo: emergencyContactPhoto as string | undefined,
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

      addPatient(patientData);
      toast.success('Patient successfully added!');
      navigate(routes.dashboard.patients);
    } catch (error) {
      toast.error('Failed to add patient. Please try again.');
    }
  };

  return (
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
          onClick={() => navigate(routes.dashboard.patients)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Patient...' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
}