import { z } from 'zod';

export const validateBody = <T>(schema: z.ZodSchema<T>, body: any): { data?: T; error?: any } => {
  const result = schema.safeParse(body);
  if (!result.success) {
    return { error: result.error.format() };
  }
  return { data: result.data };
};
