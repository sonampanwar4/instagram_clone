import type { FastifyInstance } from "fastify";

const taggedService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      fastify.log.info("Fetching tagged posts grid");
      return fastify.transactions.tagged.getAll();
    },
  };
};

export { taggedService };