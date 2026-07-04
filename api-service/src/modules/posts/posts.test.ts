import Fastify from "fastify";
import multipart from "@fastify/multipart";
import { postsRoutes } from "./posts.routes";
import FormData from "form-data";

const createMock = jest.fn();
const getAllMock = jest.fn();

jest.mock("./posts.service", () => ({
  postsService: () => ({
    create: createMock,
    getAll: getAllMock,
  }),
}));

describe("Posts API", () => {
  let app: ReturnType<typeof Fastify>;

  beforeEach(async () => {
    app = Fastify();

    app.register(multipart);
    app.register(postsRoutes);

    await app.ready();

    jest.clearAllMocks();
  });

  afterEach(async () => {
    await app.close();
  });

  it("POST /posts should create a post", async () => {
    const createdPost = {
      id: 1,
      img_url: "/uploads/fake.jpg",
      caption: "A brand new post from our test!",
    };

    createMock.mockResolvedValue(createdPost);

    const form = new FormData();
    form.append("caption", "A brand new post from our test!");

    const response = await app.inject({
      method: "POST",
      url: "/posts",
      payload: form,
      headers: form.getHeaders(),
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(createdPost);

    expect(createMock).toHaveBeenCalledWith({
      caption: "A brand new post from our test!",
      imageFile: undefined,
    });
  });

  it("GET /posts should return all posts", async () => {
    const posts = [
      {
        id: 1,
        img_url: "http://example.com/1.jpg",
        caption: "First post",
        created_at: new Date().toISOString(),
      },
    ];

    getAllMock.mockResolvedValue(posts);

    const response = await app.inject({
      method: "GET",
      url: "/posts",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toHaveLength(1);
  });
});