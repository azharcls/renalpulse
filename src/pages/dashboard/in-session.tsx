import { useState } from 'react';
import { useTreatmentSessionStore } from '@/lib/store/treatment-session';
import { useAuthStore } from '@/lib/store/auth';
import { ActiveSessionsList } from '@/components/in-session/active-sessions-list';
import { TreatmentForm } from '@/components/in-session/treatment-form';
import { Select } from '@/components/ui/select';

export function InSessionPage() {
  const [selectedShift, setSelectedShift] = useState<1 | 2 | 3>(1);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const getActiveSessionsByShift = useTreatmentSessionStore((state) => state.getActiveSessionsByShift);
  const user = useAuthStore((state) => state.user);

  const activeSessions = getActiveSessionsByShift(selectedShift);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">In Session Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor and manage ongoing dialysis treatments
          </p>
        </div>
        <Select
          value={selectedShift.toString()}
          onChange={(e) => setSelectedShift(Number(e.target.value) as 1 | 2 | 3)}
          options={[
            { value: '1', label: 'Morning Shift (6:00 AM - 2:00 PM)' },
            { value: '2', label: 'Evening Shift (2:00 PM - 10:00 PM)' },
            { value: '3', label: 'Night Shift (10:00 PM - 6:00 AM)' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <ActiveSessionsList
            sessions={activeSessions}
            onSelectSession={setSelectedSessionId}
            selectedSessionId={selectedSessionId}
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          {selectedSessionId ? (
            <TreatmentForm
              sessionId={selectedSessionId}
              userId={user?.id || ''}
              userName={user?.name || user?.email || ''}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              Select a patient from the list to view or update their treatment record
            </div>
          )}
        </div>
      </div>
    </div>
  );
}