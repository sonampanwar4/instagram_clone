import { z } from "zod";

// First, we declare a zod schema
const taggedSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string(),
  tagged_by_user: z.string(),
  created_at: z.string()
});

const taggedsSchema = z.array(taggedSchema);

// Then, we infer the TypeScript type from the Zod schema.
type Tagged = z.infer<typeof taggedSchema>;

export { taggedSchema, taggedsSchema };
export type { Tagged };