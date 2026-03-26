import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { postsService } from "./posts.service";
import { z } from "zod";
import { postsSchema, createPostSchema } from "./posts.types"


export const postsRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  const service = postsService(app);

  app.post("/posts", async (request, reply) => {
    // Ensure the request is multipart
    if (!request.isMultipart()) {
      reply.code(415).send({ message: "Request must be multipart" });
      return;
    }
    const parts = request.parts(); // Get the multipart parts

    let caption: string | undefined;
    let imageFile: { buffer: Buffer; filename: string } | undefined;

    for await (const part of parts) {
      if (part.type === "field") {
        if (part.fieldname === "caption") {
          caption = part.value as string;
        }
      } else if (part.type === "file") {
        // Read the file stream into a buffer
        const buffers: Buffer[] = [];
        for await (const chunk of part.file) {
          buffers.push(chunk);
        }
        imageFile = {
          buffer: Buffer.concat(buffers),
          filename: part.filename,
        };
      }
    }

    // Basic validation (can be enhanced with Zod for fields if not using streams)
    if (!imageFile && !caption) {
      return reply
        .code(400)
        .send({ message: "Either image or caption is required." });
    }

    try {
      // We can still validate the caption if it exists
      if (caption) {
        createPostSchema.pick({ caption: true }).parse({ caption });
      }

      const newPost = await service.create({
        caption: caption || "", // Pass empty string if no caption, or adjust logic
        imageFile: imageFile,
      });

      return reply.code(201).send(newPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .code(400)
          .send({ message: "Validation failed", errors: error.errors });
      }
      app.log.error(error);
      return reply.code(500).send({ message: "Failed to create post" });
    }
  });

  app.get("/posts", async (_request, reply) => {
    const posts = await service.getAll();

    // Optional but recommended: validate response
    const validatedPosts = postsSchema.parse(posts);

    reply.send(validatedPosts);
  });
}