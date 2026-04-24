import { z } from 'zod';

export const endpointSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Invalid URL'),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
});

export type EndpointInput = z.infer<typeof endpointSchema>;
