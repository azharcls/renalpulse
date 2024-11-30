import { Patient } from '@/lib/types/patient';
import { UserCircle } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { ScheduleList } from '../schedule/schedule-list';
import { GLPanelList } from '../gl-panel/gl-panel-list';

interface ViewPatientProps {
  patient: Patient;
}

export function ViewPatient({ patient }: ViewPatientProps) {
  return (
    <div className="space-y-8 max-h-[calc(100vh-16rem)] overflow-y-auto px-1">
      {/* Patient Information */}
      <Section title="Patient Information">
        <div className="mb-6 flex items-center">
          <div className="relative h-32 w-32 flex-shrink-0">
            {patient.photo ? (
              <img
                src={patient.photo}
                alt={patient.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
                <UserCircle className="h-20 w-20 text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-gray-500">{patient.icNumber}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                patient.status === 'On Going' ? 'bg-green-100 text-green-800' :
                patient.status === 'Warded' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {patient.status}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InfoItem label="Email" value={patient.email} />
          <InfoItem label="Phone" value={patient.contactNumber} />
          <InfoItem label="Address" value={patient.address} className="col-span-2" />
        </div>
      </Section>

      {/* Emergency Contact */}
      <Section title="Emergency Contact">
        <div className="grid grid-cols-2 gap-6">
          <InfoItem label="Name" value={patient.emergencyContact.name} />
          <InfoItem label="Relationship" value={patient.emergencyContact.relationship} />
          <InfoItem label="Phone" value={patient.emergencyContact.phone} />
        </div>
      </Section>

      {/* Serology Data */}
      {patient.serologyData && (
        <Section title="Serology Data">
          <div className="grid grid-cols-2 gap-6">
            <InfoItem label="Hep B Surface Antigen" value={patient.serologyData.hepBSurfaceAntigen} />
            <InfoItem label="Hep B Surface Antibody" value={patient.serologyData.hepBSurfaceAntibody} />
            <InfoItem label="Anti HCV" value={patient.serologyData.antiHCV} />
            <InfoItem label="HIV" value={patient.serologyData.hiv} />
            <InfoItem label="VDRL" value={patient.serologyData.vdrl} />
          </div>
        </Section>
      )}

      {/* Clinical Data */}
      {patient.clinicalData && (
        <Section title="Clinical Data">
          <div className="grid grid-cols-2 gap-6">
            <InfoItem label="Diagnosis" value={patient.clinicalData.diagnosis} />
            <InfoItem label="Booking Date" value={patient.clinicalData.bookingDate} />
            <InfoItem label="Co-Morbid Condition" value={patient.clinicalData.coMorbidCondition} className="col-span-2" />
          </div>
        </Section>
      )}

      {/* Dialysis Data */}
      {patient.dialysisData && (
        <Section title="Dialysis Data">
          <div className="grid grid-cols-2 gap-6">
            <InfoItem label="First HD at" value={patient.dialysisData.firstHDAt} />
            <InfoItem label="Start Date" value={patient.dialysisData.startDate} />
            <InfoItem label="Vascular Access" value={patient.dialysisData.vascularAccess} />
            <InfoItem label="Fistula Done By" value={patient.dialysisData.fistulaDoneBy} />
            <InfoItem label="Hand Side" value={patient.dialysisData.handSide} />
          </div>
        </Section>
      )}

      {/* GL Panel */}
      <Section title="GL Panel">
        <GLPanelList patientId={patient.id} />
      </Section>

      {/* Treatment Schedule */}
      <Section title="Treatment Schedule">
        <ScheduleList patientId={patient.id} />
      </Section>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value?: string;
  className?: string;
}

function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || '-'}</dd>
    </div>
  );
}