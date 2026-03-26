import type { Database } from "better-sqlite3";
import { Post } from "@api-app/modules/posts/posts.types";

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
  // We use prepared statements for security and performance.
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *",
    ),
    // reels
    getAllReels: db.prepare("SELECT * FROM reels"),
    // tagged
    getAllTagged: db.prepare("SELECT * FROM tagged_posts"),
    // highlights
    getAllHighlights: db.prepare("SELECT * FROM highlights"),
    getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
  };
  
  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: Post) => {
      return statements.createPost.get(data);
    },
  };
  const reels = {
    getAll: () => {
      return statements.getAllReels.all();
    },
  };
  const tagged = {
    getAll: () => {
      return statements.getAllTagged.all();
    }
  };
  const highlights = {
    getAll: () => {
      return statements.getAllHighlights.all();
    },
    getById: (id: number) => {
      return statements.getHighlightById.get(id);
    },
  };

  return {
    posts, reels, tagged, highlights
  };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };