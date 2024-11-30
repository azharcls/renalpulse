import { Button } from '@/components/ui/button';

interface DeleteConfirmationProps {
  panelName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({
  panelName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Are you sure you want to delete the panel "{panelName}"? This action cannot be undone.
      </p>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete Panel
        </Button>
      </div>
    </div>
  );
}