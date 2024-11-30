import { Button } from '@/components/ui/button';

interface DeleteConfirmationProps {
  staffName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({
  staffName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Are you sure you want to remove <span className="font-medium">{staffName}</span> from the staff list? This action cannot be undone.
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
          Delete Staff
        </Button>
      </div>
    </div>
  );
}