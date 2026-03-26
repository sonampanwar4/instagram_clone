import { z } from "zod";

const taggedPostSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  tagged_by_user: z.string(),
  created_at: z.string(),
});

const taggedGridSchema = z.array(taggedPostSchema);

type TaggedPost = z.infer<typeof taggedPostSchema>;

export { taggedPostSchema, taggedGridSchema, TaggedPost };
