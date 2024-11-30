import { NewPatientForm } from '@/components/patients/new-patient';

export function NewPatientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add New Patient</h1>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the patient details below to register a new patient.
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <NewPatientForm />
      </div>
    </div>
  );
}