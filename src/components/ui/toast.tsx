import { Toaster } from 'sonner';

export { toast } from 'sonner';

export function ToastProvider() {
  return <Toaster position="bottom-right" />;
}