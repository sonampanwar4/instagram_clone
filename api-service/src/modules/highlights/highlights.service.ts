import type { FastifyInstance } from "fastify";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info("Fetching all highlights");
      return fastify.transactions.highlights.getAll();
    },

    getById: async (id: number) => {
      fastify.log.info(`Fetching highlight ${id}`);
      return fastify.transactions.highlights.getById(id);
    },
  };
};

export { highlightsService };
