import type { FastifyInstance } from "fastify";
import { highlightsService } from "./highlights.service";
import { highlightSchema, highlightsSchema } from "./highlights.types";

export async function highlightsRoutes(app: FastifyInstance) {
  const service = highlightsService(app);

  app.get("/highlights", async (_request, reply) => {
    const highlights = await service.getAll();
    const validated = highlightsSchema.parse(highlights);
    reply.send(validated);
  });

  app.get("/highlights/:id", async (request, reply) => {
    const id = Number((request.params as any).id);

    const highlight = await service.getById(id);

    if (!highlight) {
      return reply.code(404).send({ message: "Highlight not found" });
    }

    const validated = highlightSchema.parse(highlight);
    reply.send(validated);
  });
}
