import { PatientList } from '@/components/patients/patient-list';

export function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage and view all patient records.
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <PatientList />
      </div>
    </div>
  );
}