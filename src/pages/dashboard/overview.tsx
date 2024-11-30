import { useAuthStore } from '@/lib/store/auth';

export function DashboardOverviewPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening at {user?.facilityName} today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white px-6 py-4 shadow">
          <p className="text-sm font-medium text-gray-600">Total Patients</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">123</p>
        </div>
        <div className="rounded-lg bg-white px-6 py-4 shadow">
          <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">45</p>
        </div>
        <div className="rounded-lg bg-white px-6 py-4 shadow">
          <p className="text-sm font-medium text-gray-600">Active Staff</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
        </div>
        <div className="rounded-lg bg-white px-6 py-4 shadow">
          <p className="text-sm font-medium text-gray-600">Available Machines</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">8</p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Today's Schedule</h2>
        <div className="mt-4 space-y-4">
          {[1, 2, 3].map((shift) => (
            <div
              key={shift}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
            >
              <div>
                <p className="font-medium text-gray-900">Shift {shift}</p>
                <p className="text-sm text-gray-600">15 patients scheduled</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                In Progress
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}