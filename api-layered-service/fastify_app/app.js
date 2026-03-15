import Fastify from "fastify";
import autoload from "@fastify/autoload";
import { join } from "path";

const app = Fastify({ logger: true });

app.register(autoload, { dir: join(__dirname, "routes") });

app.listen({ port: 3000 });