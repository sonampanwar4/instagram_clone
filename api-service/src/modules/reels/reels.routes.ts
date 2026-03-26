import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";
import { reelsGridSchema } from "./reels.types";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.get("/reels/grid", async (request, reply) => {
    const reels = await service.getAll();
    // validate response
    reelsGridSchema.parse(reels);

    return reply.code(200).send(reels);
  })
};

export { reelsRoutes };