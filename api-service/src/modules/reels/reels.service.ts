import type { FastifyInstance } from "fastify";

const reelsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info("Fetching reels grid");
      return fastify.transactions.reels.getAll();
    },
  };
};

export { reelsService };