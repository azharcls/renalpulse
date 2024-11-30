import { Panel } from '@/lib/types/panel';
import { Building2, UserCircle } from 'lucide-react';
import { usePatientStore } from '@/lib/store/patient';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/lib/routes';
import { Button } from '../ui/button';

interface ViewPanelProps {
  panel: Panel;
}

export function ViewPanel({ panel }: ViewPanelProps) {
  const navigate = useNavigate();
  const patients = usePatientStore((state) => 
    state.patients.filter(patient => 
      patient.panelCoverage.includes(panel.name)
    )
  );

  return (
    <div className="space-y-8">
      {/* Panel Information */}
      <Section title="Panel Information">
        <div className="mb-6 flex items-center">
          <div className="relative h-32 w-32 flex-shrink-0">
            {panel.logo ? (
              <img
                src={panel.logo}
                alt={panel.name}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                <Building2 className="h-20 w-20 text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-gray-900">{panel.name}</h3>
            <p className="text-gray-500 capitalize">{panel.type}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                panel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {panel.status}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InfoItem label="Email" value={panel.email} />
          <InfoItem label="Phone Number" value={panel.phoneNumber} />
          {panel.ext && <InfoItem label="Ext" value={panel.ext} />}
          {panel.faxNumber && <InfoItem label="Fax Number" value={panel.faxNumber} />}
          <InfoItem label="Address" value={panel.address} className="col-span-2" />
        </div>
      </Section>

      {/* Person In Charge */}
      <Section title="Person In Charge">
        <div className="grid grid-cols-2 gap-6">
          <InfoItem label="Name" value={panel.personInCharge} />
          <InfoItem label="Contact Number" value={panel.picContactNumber} />
          <InfoItem label="Email" value={panel.picEmail} />
        </div>
      </Section>

      {/* Patients Under This Panel */}
      <Section title={`Patients (${patients.length})`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                {patient.photo ? (
                  <img
                    src={patient.photo}
                    alt={patient.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
                    <UserCircle className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {patient.name}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {patient.icNumber}
                </p>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  patient.status === 'On Going' ? 'bg-green-100 text-green-800' :
                  patient.status === 'Warded' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(routes.dashboard.patients)}
                className="flex-shrink-0"
              >
                View
              </Button>
            </div>
          ))}
          {patients.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No patients are currently under this panel.
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
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