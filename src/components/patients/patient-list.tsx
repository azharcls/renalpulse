import { useState } from 'react';
import { Search, Plus, Edit2, Eye, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Patient, PatientStatus } from '@/lib/types/patient';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { routes } from '@/lib/routes';
import { usePatientStore } from '@/lib/store/patient';
import { EditPatientForm } from './edit-patient';
import { ViewPatient } from './view-patient';

const statusColors: Record<PatientStatus, string> = {
  'On Going': 'bg-green-100 text-green-800',
  'Warded': 'bg-yellow-100 text-yellow-800',
  'Referral': 'bg-blue-100 text-blue-800',
  'Unknown': 'bg-gray-100 text-gray-800',
  'Ceased': 'bg-red-100 text-red-800',
  'Transfer': 'bg-purple-100 text-purple-800',
  'Booking': 'bg-orange-100 text-orange-800',
};

export function PatientList() {
  const navigate = useNavigate();
  const patients = usePatientStore((state) => state.patients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'All'>('All');
  const [panelFilter, setPanelFilter] = useState<string>('All');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const uniquePanels = Array.from(
    new Set(patients.flatMap(patient => patient.panelCoverage))
  );

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.icNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    const matchesPanel = panelFilter === 'All' || patient.panelCoverage.includes(panelFilter);
    return matchesSearch && matchesStatus && matchesPanel;
  });

  const handleNewPatient = () => {
    navigate(routes.dashboard.newPatient);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PatientStatus | 'All')}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="All">All Status</option>
            <option value="On Going">On Going</option>
            <option value="Warded">Warded</option>
            <option value="Referral">Referral</option>
            <option value="Unknown">Unknown</option>
            <option value="Ceased">Ceased</option>
            <option value="Transfer">Transfer</option>
            <option value="Booking">Booking</option>
          </select>

          <select
            value={panelFilter}
            onChange={(e) => setPanelFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="All">All Panels</option>
            {uniquePanels.map(panel => (
              <option key={panel} value={panel}>{panel}</option>
            ))}
          </select>

          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleNewPatient}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              {patient.photo ? (
                <img
                  src={patient.photo}
                  alt={patient.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                  <UserCircle className="h-20 w-20 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                <p className="text-sm text-gray-200">{patient.icNumber}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[patient.status]}`}>
                  {patient.status}
                </span>
                {patient.panelCoverage.map((panel) => (
                  <span
                    key={panel}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {panel}
                  </span>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewPatient(patient)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPatient(patient)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient Details"
      >
        {selectedPatient && (
          <EditPatientForm
            patient={selectedPatient}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Patient Details"
      >
        {selectedPatient && <ViewPatient patient={selectedPatient} />}
      </Modal>
    </div>
  );
}