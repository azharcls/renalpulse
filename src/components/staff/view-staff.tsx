import { Staff } from '@/lib/types/staff';
import { UserCircle } from 'lucide-react';

interface ViewStaffProps {
  staff: Staff;
}

export function ViewStaff({ staff }: ViewStaffProps) {
  return (
    <div className="space-y-8">
      {/* Staff Information */}
      <Section title="Staff Information">
        <div className="mb-6 flex items-center">
          <div className="relative h-32 w-32 flex-shrink-0">
            {staff.photo ? (
              <img
                src={staff.photo}
                alt={staff.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
                <UserCircle className="h-20 w-20 text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-gray-900">{staff.name}</h3>
            <p className="text-gray-500">{staff.position}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                staff.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                staff.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {staff.status}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InfoItem label="Email" value={staff.email} />
          <InfoItem label="Phone" value={staff.phone} />
          <InfoItem label="Shift" value={staff.schedule?.shift} />
        </div>
      </Section>

      {/* Emergency Contact */}
      <Section title="Emergency Contact">
        <div className="grid grid-cols-2 gap-6">
          <InfoItem label="Name" value={staff.emergencyContact.name} />
          <InfoItem label="Relationship" value={staff.emergencyContact.relationship} />
          <InfoItem label="Phone" value={staff.emergencyContact.phone} />
          <InfoItem label="Address" value={staff.emergencyContact.address} className="col-span-2" />
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