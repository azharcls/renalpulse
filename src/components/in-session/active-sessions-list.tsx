import { TreatmentSession } from '@/lib/types/treatment-session';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { usePatientStore } from '@/lib/store/patient';

interface ActiveSessionsListProps {
  sessions: TreatmentSession[];
  onSelectSession: (sessionId: string) => void;
  selectedSessionId: string | null;
}

export function ActiveSessionsList({
  sessions,
  onSelectSession,
  selectedSessionId,
}: ActiveSessionsListProps) {
  const patients = usePatientStore((state) => state.patients);

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No active sessions for the selected shift
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
      <div className="divide-y divide-gray-200">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`flex items-center justify-between py-4 ${
              selectedSessionId === session.id ? 'bg-teal-50' : ''
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                  Machine {session.machineNumber}
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="truncate text-sm font-medium text-gray-900">
                  {getPatientName(session.patientId)}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Started at {format(new Date(session.startTime), 'hh:mm a')}
              </div>
            </div>
            <Button
              variant={selectedSessionId === session.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSelectSession(session.id)}
              className={selectedSessionId === session.id ? 'bg-teal-600 hover:bg-teal-700' : ''}
            >
              {selectedSessionId === session.id ? 'Selected' : 'View Details'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}