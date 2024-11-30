import { useState } from 'react';
import { Search, Plus, Edit2, Eye, Building2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { NewPanelForm } from '@/components/panels/new-panel-form';
import { EditPanelForm } from '@/components/panels/edit-panel-form';
import { ViewPanel } from '@/components/panels/view-panel';
import { DeleteConfirmation } from '@/components/panels/delete-confirmation';
import { usePanelStore } from '@/lib/store/panel';
import { Panel } from '@/lib/types/panel';
import { toast } from 'sonner';

export function PanelPage() {
  const panels = usePanelStore((state) => state.panels);
  const getPanelsByType = usePanelStore((state) => state.getPanelsByType);
  const deletePanel = usePanelStore((state) => state.deletePanel);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isNewPanelModalOpen, setIsNewPanelModalOpen] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredPanels = getPanelsByType(typeFilter).filter(panel => {
    const matchesSearch = 
      panel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panel.personInCharge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEditPanel = (panel: Panel) => {
    setSelectedPanel(panel);
    setIsEditModalOpen(true);
  };

  const handleViewPanel = (panel: Panel) => {
    setSelectedPanel(panel);
    setIsViewModalOpen(true);
  };

  const handleDeletePanel = (panel: Panel) => {
    setSelectedPanel(panel);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPanel) {
      deletePanel(selectedPanel.id);
      toast.success('Panel deleted successfully');
      setIsDeleteModalOpen(false);
      setSelectedPanel(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Panel Management</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage insurance panels and payment coverage providers.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search panels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="all">All Types</option>
            <option value="insurance">Insurance</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>

          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setIsNewPanelModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Panel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPanels.map((panel) => (
          <div
            key={panel.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              {panel.logo ? (
                <img
                  src={panel.logo}
                  alt={panel.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                  <Building2 className="h-20 w-20 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{panel.name}</h3>
                <p className="text-sm text-gray-200 capitalize">{panel.type}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4 space-y-2">
                <div className="text-sm text-gray-600">
                  <strong>PIC:</strong> {panel.personInCharge}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Contact:</strong> {panel.picContactNumber}
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    panel.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {panel.status}
                </span>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewPanel(panel)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPanel(panel)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePanel(panel)}
                  className="border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isNewPanelModalOpen}
        onClose={() => setIsNewPanelModalOpen(false)}
        title="Add New Panel"
      >
        <NewPanelForm onClose={() => setIsNewPanelModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Panel"
      >
        {selectedPanel && (
          <EditPanelForm
            panel={selectedPanel}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Panel Details"
      >
        {selectedPanel && <ViewPanel panel={selectedPanel} />}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Panel"
      >
        <DeleteConfirmation
          panelName={selectedPanel?.name || ''}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
}