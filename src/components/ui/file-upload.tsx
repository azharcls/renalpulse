import { forwardRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  error?: string;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, error, value, onChange, ...props }, ref) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onChange?.(e.dataTransfer.files[0]);
      }
    }, [onChange]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onChange?.(e.target.files[0]);
      }
    }, [onChange]);

    const displayValue = value instanceof File ? value.name : 
      typeof value === 'string' ? 'Current image' : null;

    return (
      <div className="space-y-1">
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'flex min-h-[80px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100',
            dragActive && 'border-teal-500 bg-teal-50',
            error && 'border-red-500',
            className
          )}
        >
          <div className="space-y-1 text-center">
            {displayValue ? (
              <>
                <Upload className="mx-auto h-6 w-6 text-teal-600" />
                <div className="text-teal-600">{displayValue}</div>
                <div className="text-xs text-gray-500">
                  Click to change or drag and drop
                </div>
              </>
            ) : (
              <>
                <Upload className="mx-auto h-6 w-6 text-gray-400" />
                <div className="text-gray-600">Click to upload or drag and drop</div>
                <div className="text-xs text-gray-500">
                  {props.accept
                    ? `Supported formats: ${props.accept}`
                    : 'All file types supported'}
                </div>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';