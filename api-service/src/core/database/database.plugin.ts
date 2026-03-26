import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Database from "better-sqlite3";
import {
  createTransactionHelpers,
  type TransactionHelpers,
} from "./database.transactions";

declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    transactions: TransactionHelpers;
  }
}

async function databasePluginHelper(fastify: FastifyInstance) {
  const db = new Database("./database.db");
  fastify.log.info("SQLite database connection established.");

  // Create a simple table for testing if it doesn't exist
  db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT NOT NULL,
    caption TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
db.exec(`
  INSERT INTO posts (img_url, caption) VALUES
    ('https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg', 'Sunflower post'),
    ('https://tinyjpg.com/images/social/website.jpg', 'Panda post'),
    ('https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_hybrid&w=740&q=80', 'Butterfly post');
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS reels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    caption TEXT,
    views INTEGER NOT NULL DEFAULT 0
  );
`);
db.exec(`
  INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES
    ('https://cdn.pixabay.com/video/2021/10/17/92367-637669186_large.mp4', 'https://cdn.pixabay.com/video/2021/10/17/92367-637669186_large.mp4','Waterfall post', 10),
    ('https://cdn.pixabay.com/video/2024/06/03/215082_large.mp4', 'https://cdn.pixabay.com/video/2024/06/03/215082_large.mp4','squrrel post', 15);
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tagged_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT NOT NULL,
    caption TEXT,
    tagged_by_user TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const taggedCount = db
  .prepare("SELECT COUNT(*) as count FROM tagged_posts")
  .get() as any;

if (taggedCount.count === 0) {
  const insert = db.prepare(
    "INSERT INTO tagged_posts (img_url, caption, tagged_by_user) VALUES (?, ?, ?)",
  );

  insert.run(
    "https://t3.ftcdn.net/jpg/17/83/64/44/360_F_1783644427_Uanf2gj3s8SiQDnJ58ImTsAT3uUl6MhP.jpg",
    "Tagged seed post 1",
    "alice",
  );

  insert.run(
    "https://png.pngtree.com/thumb_back/fh260/background/20230521/pngtree-artificial-intelligence-generates-colourful-and-cute-portrait-of-a-funny-cat-wearing-neon-sunglasses-as-fashion-accessory-photo-image_51627990.jpg",
    "Tagged seed post 2",
    "bob",
  );
}
db.exec(`
  CREATE TABLE IF NOT EXISTS highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cover_image_url TEXT NOT NULL,
    title TEXT NOT NULL
  );
`);

const highlightCount = db
  .prepare("SELECT COUNT(*) as count FROM highlights")
  .get() as any;

if (highlightCount.count === 0) {
  const insert = db.prepare(
    "INSERT INTO highlights (cover_image_url, title) VALUES (?, ?)",
  );

  insert.run("https://media.istockphoto.com/id/1160947136/photo/couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island.jpg?s=612x612&w=0&k=20&c=WJWEH22TFinjI0edzblfH-Nw0cdBfPX5LV8EMvs8Quo=", "Enjoy Vacation");
  insert.run("https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038=", "Team Work");
}

  const transactions = createTransactionHelpers(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (instance, done) => {
    instance.db.close();
    instance.log.info("SQLite database connection closed.");
    done();
  });
}

const databasePlugin = fp(databasePluginHelper);

export { databasePlugin };