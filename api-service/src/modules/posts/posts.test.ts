import Fastify from "fastify";
import { postsRoutes } from "./posts.routes";

describe("POST /posts", () => {
  it("should create a new post and return it with a 201 status code", async () => {
    const app = Fastify();

    const newPostPayload = {
      img_url: "http://example.com/new-image.jpg",
      caption: "A brand new post from our test!",
    };

    const createdPost = { ...newPostPayload, id: 1 };

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn().mockReturnValue(createdPost),
      },
      reels: {
        getAll: jest.fn(), // not used here, but required
      },
      tagged: {
        getAll: jest.fn(),
      },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn(),
      }
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "POST",
      url: "/posts",
      payload: newPostPayload,
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(createdPost);
  });

  describe("GET /posts", () => {
  it("should return all posts", async () => {
    const app = Fastify();

    const posts = [
      { id: 1, img_url: "http://example.com/new-image.jpg", 
        caption: "First post", 
        created_at: new Date().toISOString() 
      },
      { id: 2, img_url: "http://example.com/new-image.jpg", 
        caption: "Second post", 
        created_at: new Date().toISOString() 
      }
    ];

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn().mockReturnValue(posts),
        create: jest.fn(),
      },
      reels: {
        getAll: jest.fn(), // not used here, but required
      },
      tagged: {
        getAll: jest.fn(),
      },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn(),
      }
    });

    app.register(postsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/posts",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(posts);
  });
});

  
});