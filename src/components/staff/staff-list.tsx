import { useState } from 'react';
import { Search, Plus, Edit2, Eye, UserCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useStaffStore } from '@/lib/store/staff';
import { Staff, StaffStatus } from '@/lib/types/staff';
import { EditStaffForm } from './edit-staff-form';
import { ViewStaff } from './view-staff';
import { DeleteConfirmation } from './delete-confirmation';
import { toast } from 'sonner';

const statusColors: Record<StaffStatus, string> = {
  'On Duty': 'bg-green-100 text-green-800',
  'On Leave': 'bg-yellow-100 text-yellow-800',
  'Off Duty': 'bg-red-100 text-red-800',
};

interface StaffListProps {
  onAddStaff: () => void;
}

export function StaffList({ onAddStaff }: StaffListProps) {
  const { staff, deleteStaff } = useStaffStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StaffStatus | 'All'>('All');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditStaff = (member: Staff) => {
    setSelectedStaff(member);
    setIsEditModalOpen(true);
  };

  const handleViewStaff = (member: Staff) => {
    setSelectedStaff(member);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (member: Staff) => {
    setSelectedStaff(member);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedStaff) {
      deleteStaff(selectedStaff.id);
      toast.success(`${selectedStaff.name} has been removed from staff`);
      setIsDeleteModalOpen(false);
      setSelectedStaff(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StaffStatus | 'All')}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="All">All Status</option>
            <option value="On Duty">On Duty</option>
            <option value="On Leave">On Leave</option>
            <option value="Off Duty">Off Duty</option>
          </select>

          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={onAddStaff}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Staff
          </Button>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                  <UserCircle className="h-20 w-20 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-gray-200">{member.position}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 space-y-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[member.status]}`}>
                  {member.status}
                </span>
                {member.schedule?.shift && (
                  <div className="text-sm text-gray-600">
                    Shift: {member.schedule.shift}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewStaff(member)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditStaff(member)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(member)}
                  className="border-gray-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Staff Member"
      >
        {selectedStaff && (
          <EditStaffForm
            staff={selectedStaff}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Staff Details"
      >
        {selectedStaff && <ViewStaff staff={selectedStaff} />}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Staff Member"
      >
        {selectedStaff && (
          <DeleteConfirmation
            staffName={selectedStaff.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}