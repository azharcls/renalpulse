import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useGLPanelStore } from '@/lib/store/gl-panel';
import { GLPanel } from '@/lib/types/gl-panel';
import { NewGLPanelForm } from './new-gl-panel-form';
import { EditGLPanelForm } from './edit-gl-panel-form';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface GLPanelListProps {
  patientId: string;
}

export function GLPanelList({ patientId }: GLPanelListProps) {
  const glPanels = useGLPanelStore((state) => state.getPatientGLPanels(patientId));
  const deleteGLPanel = useGLPanelStore((state) => state.deleteGLPanel);
  const [isNewGLPanelModalOpen, setIsNewGLPanelModalOpen] = useState(false);
  const [selectedGLPanel, setSelectedGLPanel] = useState<GLPanel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditGLPanel = (panel: GLPanel) => {
    setSelectedGLPanel(panel);
    setIsEditModalOpen(true);
  };

  const handleDeleteGLPanel = (panelId: string) => {
    if (confirm('Are you sure you want to delete this GL Panel?')) {
      deleteGLPanel(panelId);
      toast.success('GL Panel deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">GL Panel Details</h3>
        <Button
          onClick={() => setIsNewGLPanelModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Update GL Panel
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Panel Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HD Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {glPanels.map((panel) => (
              <tr key={panel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {panel.panelName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>RM {panel.hdCoverage.amountPerSession.toFixed(2)} / session</div>
                  {panel.hdCoverage.maxSessions && (
                    <div className="text-xs text-gray-500">
                      Max {panel.hdCoverage.maxSessions} sessions
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="space-y-2">
                    {panel.medications.map((med, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-gray-500">
                          RM {med.amount.toFixed(2)} per unit
                        </div>
                        <div className="text-sm text-gray-500">
                          {med.volume} {med.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{format(new Date(panel.effectiveDate), 'dd/MM/yyyy')}</div>
                  <div className="text-xs text-gray-500">
                    to {format(new Date(panel.expiryDate), 'dd/MM/yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    panel.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {panel.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditGLPanel(panel)}
                    className="mr-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteGLPanel(panel.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {glPanels.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No GL Panel records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isNewGLPanelModalOpen}
        onClose={() => setIsNewGLPanelModalOpen(false)}
        title="Update GL Panel"
      >
        <NewGLPanelForm
          patientId={patientId}
          onClose={() => setIsNewGLPanelModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit GL Panel"
      >
        {selectedGLPanel && (
          <EditGLPanelForm
            glPanel={selectedGLPanel}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}