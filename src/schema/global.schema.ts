import { z, object } from 'zod';

export const GlobalUpdateSchema = object({
  body: object({
    name: z.enum(['workers', 'clients', 'com_projects', 'run_projects']),
    count: z.number({ invalid_type_error: 'Invalid type of Count' })
      .min(0, 'Count must be greater than 0')
      .max(1000, 'Count must be less than 1000').optional(),
    value: z.boolean({ invalid_type_error: 'Invalid type of value' }).optional(),
  }),
});
