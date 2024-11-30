import { useState } from 'react';
import { Search, Plus, Edit2, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { StaffList } from '@/components/staff/staff-list';
import { NewStaffForm } from '@/components/staff/new-staff-form';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/lib/routes';

export function StaffPage() {
  const navigate = useNavigate();
  const [isNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Staff Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage staff members and their duty status.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate(routes.dashboard.dutyRoster)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Manage Duty Roster
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <StaffList onAddStaff={() => setIsNewStaffModalOpen(true)} />
      </div>

      <Modal
        isOpen={isNewStaffModalOpen}
        onClose={() => setIsNewStaffModalOpen(false)}
        title="Add New Staff Member"
      >
        <NewStaffForm onClose={() => setIsNewStaffModalOpen(false)} />
      </Modal>
    </div>
  );
}