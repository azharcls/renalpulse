import { z } from 'zod';

export const panelSchema = z.object({
  name: z.string().min(1, 'Panel name is required'),
  type: z.enum(['insurance', 'government', 'private'], {
    required_error: 'Panel type is required',
  }),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  ext: z.string().optional(),
  faxNumber: z.string().optional(),
  personInCharge: z.string().min(1, 'Person in charge is required'),
  picContactNumber: z.string().min(1, 'PIC contact number is required'),
  picEmail: z.string().email('Invalid PIC email address'),
  logo: z.any().optional(),
});