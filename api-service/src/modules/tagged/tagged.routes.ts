import type { FastifyInstance } from "fastify";
import { taggedService } from "./tagged.service";
import { taggedGridSchema } from "./tagged.types";

export async function taggedRoutes(app: FastifyInstance) {
  const service = taggedService(app);

  app.get("/tagged/grid", async (_request, reply) => {
    const taggedPosts = await service.getAll();

    const validated = taggedGridSchema.parse(taggedPosts);

    reply.send(validated);
  });
}
