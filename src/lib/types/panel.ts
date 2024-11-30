export interface Panel {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  ext?: string;
  faxNumber?: string;
  personInCharge: string;
  picContactNumber: string;
  picEmail: string;
  logo?: string;
  type: 'insurance' | 'government' | 'private';
  status: 'active' | 'inactive';
}

export type PanelFormData = Omit<Panel, 'id' | 'status'>;