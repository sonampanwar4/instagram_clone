import { z } from "zod";

// First, we define the zod schemas
const reelSchema = z.object({
  id: z.number(),
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string(),
  views: z.number(),
});

// GET /reels/grid response schema
const reelsGridSchema = z.array(reelSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type Reel = z.infer<typeof reelSchema>;

export { reelSchema, reelsGridSchema, Reel };