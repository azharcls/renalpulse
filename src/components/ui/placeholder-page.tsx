import { cn } from '@/lib/utils';

interface PlaceholderPageProps {
  title: string;
  className?: string;
}

export function PlaceholderPage({ title, className }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-600">
          This page is under construction.
        </p>
      </div>

      <div className={cn("rounded-lg bg-white p-6 shadow", className)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-medium text-gray-900">Coming Soon</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We're working hard to bring you this feature. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}