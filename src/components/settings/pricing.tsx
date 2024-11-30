import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useSettingsStore } from '@/lib/store/settings';
import { PricingConfig } from '@/lib/types/settings';
import { toast } from 'sonner';
import { NewPricingForm } from './pricing/new-pricing-form';
import { EditPricingForm } from './pricing/edit-pricing-form';

export function PricingSettings() {
  const { pricing, deletePricing } = useSettingsStore();
  const [selectedConfig, setSelectedConfig] = useState<PricingConfig | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this pricing configuration?')) {
      deletePricing(id);
      toast.success('Pricing configuration deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Pricing Configuration</h2>
        <Button
          onClick={() => setIsNewModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Price
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pricing.map((config) => (
          <div
            key={config.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{config.name}</h3>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                config.type === 'treatment'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {config.type}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              RM {config.basePrice.toFixed(2)}
            </p>
            {config.description && (
              <p className="mt-2 text-sm text-gray-600">{config.description}</p>
            )}
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedConfig(config);
                  setIsEditModalOpen(true);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(config.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Add New Price"
      >
        <NewPricingForm onClose={() => setIsNewModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Price"
      >
        {selectedConfig && (
          <EditPricingForm
            pricing={selectedConfig}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}