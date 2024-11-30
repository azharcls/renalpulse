import { Activity, Calendar, Users, ClipboardList, LineChart, Shield } from 'lucide-react';

const features = [
  {
    name: 'Patient Management',
    description: 'Comprehensive patient profiles with medical history tracking and treatment schedules.',
    icon: Users,
  },
  {
    name: 'Treatment Scheduling',
    description: 'Efficient shift management and automated scheduling system.',
    icon: Calendar,
  },
  {
    name: 'Real-time Monitoring',
    description: 'Track patient vitals and machine status in real-time.',
    icon: Activity,
  },
  {
    name: 'Inventory Control',
    description: 'Automated stock management and reordering system.',
    icon: ClipboardList,
  },
  {
    name: 'Analytics Dashboard',
    description: 'Detailed insights and reports for better decision making.',
    icon: LineChart,
  },
  {
    name: 'Multi-tenant Security',
    description: 'Isolated and secure data management for each facility.',
    icon: Shield,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Comprehensive Solution
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your dialysis center
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}