import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("Highlights API", () => {
  it("GET /highlights should return all highlights", async () => {
    const app = Fastify();

    const mockHighlights = [
      {
        id: 1,
        cover_image_url: "http://example.com/highlight1.jpg",
        title: "Vacation",
      },
      {
        id: 2,
        cover_image_url: "http://example.com/highlight2.jpg",
        title: "Work",
      },
    ];

    app.decorate("transactions", {
      posts: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      reels: { getAll: jest.fn() },
      tagged: { getAll: jest.fn() },
      highlights: {
        getAll: jest.fn().mockReturnValue(mockHighlights),
        getById: jest.fn(),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlights);
  });

  it("GET /highlights/:id should return a single highlight", async () => {
    const app = Fastify();

    const highlight = {
      id: 1,
      cover_image_url: "http://example.com/highlight1.jpg",
      title: "Vacation",
    };

    app.decorate("transactions", {
      posts: { getById: jest.fn(), getAll: jest.fn(), create: jest.fn() },
      reels: { getAll: jest.fn() },
      tagged: { getAll: jest.fn() },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn().mockReturnValue(highlight),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(highlight);
  });
});
