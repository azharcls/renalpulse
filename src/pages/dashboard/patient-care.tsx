import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useTreatmentStore } from '@/lib/store/treatment';
import { Treatment, CareService } from '@/lib/types/treatment';
import { NewTreatmentForm } from '@/components/treatments/new-treatment-form';
import { EditTreatmentForm } from '@/components/treatments/edit-treatment-form';
import { NewCareServiceForm } from '@/components/treatments/new-care-service-form';
import { EditCareServiceForm } from '@/components/treatments/edit-care-service-form';
import { toast } from 'sonner';

export function PatientCarePage() {
  const {
    treatments,
    careServices,
    deleteTreatment,
    deleteCareService,
  } = useTreatmentStore();

  const [isNewTreatmentModalOpen, setIsNewTreatmentModalOpen] = useState(false);
  const [isNewCareServiceModalOpen, setIsNewCareServiceModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedCareService, setSelectedCareService] = useState<CareService | null>(null);
  const [isEditTreatmentModalOpen, setIsEditTreatmentModalOpen] = useState(false);
  const [isEditCareServiceModalOpen, setIsEditCareServiceModalOpen] = useState(false);

  const handleDeleteTreatment = (id: string) => {
    if (confirm('Are you sure you want to delete this treatment?')) {
      deleteTreatment(id);
      toast.success('Treatment deleted successfully');
    }
  };

  const handleDeleteCareService = (id: string) => {
    if (confirm('Are you sure you want to delete this care service?')) {
      deleteCareService(id);
      toast.success('Care service deleted successfully');
    }
  };

  return (
    <div className="space-y-8">
      {/* Treatments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Treatments</h2>
            <p className="text-sm text-gray-600">Manage available treatments and their costs</p>
          </div>
          <Button
            onClick={() => setIsNewTreatmentModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Treatment
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{treatment.name}</h3>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  treatment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {treatment.status}
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                RM {treatment.costPerSession.toFixed(2)}
                <span className="text-sm font-normal text-gray-500"> / session</span>
              </p>
              {treatment.description && (
                <p className="mt-2 text-sm text-gray-600">{treatment.description}</p>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTreatment(treatment);
                    setIsEditTreatmentModalOpen(true);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTreatment(treatment.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Care Services Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Care Services</h2>
            <p className="text-sm text-gray-600">Manage additional care services and their costs</p>
          </div>
          <Button
            onClick={() => setIsNewCareServiceModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Care Service
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careServices.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                RM {service.costPerSession.toFixed(2)}
                <span className="text-sm font-normal text-gray-500"> / session</span>
              </p>
              {service.description && (
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCareService(service);
                    setIsEditCareServiceModalOpen(true);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCareService(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isNewTreatmentModalOpen}
        onClose={() => setIsNewTreatmentModalOpen(false)}
        title="Add Treatment"
      >
        <NewTreatmentForm onClose={() => setIsNewTreatmentModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditTreatmentModalOpen}
        onClose={() => setIsEditTreatmentModalOpen(false)}
        title="Edit Treatment"
      >
        {selectedTreatment && (
          <EditTreatmentForm
            treatment={selectedTreatment}
            onClose={() => setIsEditTreatmentModalOpen(false)}
          />
        )}
      </Modal>

      <Modal
        isOpen={isNewCareServiceModalOpen}
        onClose={() => setIsNewCareServiceModalOpen(false)}
        title="Add Care Service"
      >
        <NewCareServiceForm onClose={() => setIsNewCareServiceModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditCareServiceModalOpen}
        onClose={() => setIsEditCareServiceModalOpen(false)}
        title="Edit Care Service"
      >
        {selectedCareService && (
          <EditCareServiceForm
            careService={selectedCareService}
            onClose={() => setIsEditCareServiceModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}