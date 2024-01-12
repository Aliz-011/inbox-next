import * as z from 'zod';

export const DocumentSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  isPublished: z.boolean().optional(),
});
