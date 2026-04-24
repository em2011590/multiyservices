import { z } from 'zod';

export const translateSchema = z.object({
  code: z.string().min(1, 'Code cannot be empty'),
  sourceLang: z.string().min(1, 'Source language is required'),
  targetLang: z.string().min(1, 'Target language is required'),
});

export type TranslateInput = z.infer<typeof translateSchema>;
