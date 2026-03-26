import { z } from "zod";

// Define a Zod schema for the expected form fields
const createPostSchema = z.object({
  caption: z.string().min(1, "Caption cannot be empty.").optional(),
  // The image will be handled as a file stream/buffer, not directly in the JSON body.
  // So, we don't define it here for Zod's parsing of the JSON body,
  // but rather access it from the multipart request.
});

const postSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(), // SQLite returns DATETIME as a string by default
});

// This will be useful for validating the response from the `GET /posts` endpoint.
const postsSchema = z.array(postSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type Post = z.infer<typeof postSchema>;

export { postSchema, postsSchema, Post, createPostSchema };