import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export function ToggleButton({ isCollapsed, onClick }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md"
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <ChevronLeft 
        className={cn(
          'h-4 w-4 transition-transform duration-200',
          isCollapsed && 'rotate-180'
        )} 
      />
    </button>
  );
}