import { useState } from 'react';
import { CompanyProfileSettings } from '@/components/settings/company-profile';
import { ShiftSettings } from '@/components/settings/shifts';
import { PricingSettings } from '@/components/settings/pricing';
import { MenuSettings } from '@/components/settings/menu/menu-settings';
import { useAuthStore } from '@/lib/store/auth';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const user = useAuthStore((state) => state.user);

  const tabs = [
    { id: 'company', name: 'Company Profile' },
    { id: 'shifts', name: 'Shift Management' },
    { id: 'pricing', name: 'Pricing Configuration' },
    ...(user?.role === 'superadmin' ? [{ id: 'menu', name: 'Menu Management' }] : []),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your facility settings, shifts, and system configuration.
        </p>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'company' && <CompanyProfileSettings />}
          {activeTab === 'shifts' && <ShiftSettings />}
          {activeTab === 'pricing' && <PricingSettings />}
          {activeTab === 'menu' && user?.role === 'superadmin' && <MenuSettings />}
        </div>
      </div>
    </div>
  );
}