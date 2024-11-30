import { z } from 'zod';
import { staffSchema } from '../types/staff';

export { staffSchema };

export type StaffFormData = z.infer<typeof staffSchema>;