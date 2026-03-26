import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
  it("should return a list of tagged posts with a 200 status code", async () => {
    const app = Fastify();

    const taggedPosts = [
      { id: 1, img_url: "http://example.com/new-image.jpg", 
        caption: "First post", 
        tagged_by_user: "Alice",
        created_at: new Date().toISOString() 
      },
      { id: 2, img_url: "http://example.com/new-image.jpg", 
        caption: "Second post",
        tagged_by_user: "Bob",
        created_at: new Date().toISOString() 
      }
    ];

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn().mockReturnValue(taggedPosts),
        create: jest.fn(),
      },
      reels: {
        getAll: jest.fn(), // not used here, but required
      },
      tagged: {
        getAll: jest.fn().mockReturnValue(taggedPosts),
      },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn(),
      }
    });

    app.register(taggedRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/tagged/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(taggedPosts);
  });
});
