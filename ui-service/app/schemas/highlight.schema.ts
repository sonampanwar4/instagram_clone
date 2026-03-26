import { z } from "zod";

// First, we declare a zod schema
const highlightSchema = z.object({
  id: z.number(),
  cover_image_url: z.string().url(),
  title: z.string()
});

const highlightsSchema = z.array(highlightSchema);

// Then, we infer the TypeScript type from the Zod schema.
type Highlight = z.infer<typeof highlightSchema>;

export { highlightSchema, highlightsSchema };
export type { Highlight };