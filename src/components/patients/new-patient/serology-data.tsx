import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface SerologyDataProps {
  register: any;
}

export function SerologyData({ register }: SerologyDataProps) {
  const options = [
    { value: 'positive', label: 'Positive' },
    { value: 'negative', label: 'Negative' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Serology Data</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hepBSurfaceAntigen">Hep B Surface Antigen</Label>
          <Select
            id="hepBSurfaceAntigen"
            {...register('serologyData.hepBSurfaceAntigen')}
            options={options}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hepBSurfaceAntibody">Hep B Surface Antibody</Label>
          <Select
            id="hepBSurfaceAntibody"
            {...register('serologyData.hepBSurfaceAntibody')}
            options={options}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="antiHCV">Anti HCV</Label>
          <Select
            id="antiHCV"
            {...register('serologyData.antiHCV')}
            options={options}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiv">HIV</Label>
          <Select
            id="hiv"
            {...register('serologyData.hiv')}
            options={options}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vdrl">VDRL</Label>
          <Select
            id="vdrl"
            {...register('serologyData.vdrl')}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}