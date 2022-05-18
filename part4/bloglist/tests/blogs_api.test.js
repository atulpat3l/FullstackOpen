const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("verfies blog posts data", () => {
  test("returns the correct amount of blog posts in the JSON format", async () => {
    const response = await api.get("/api/blogs");
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(5);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("post request creates new blog post sucessfully", async () => {
    const loginUser = {
      username: "root",
      password: "sekret",
    };
    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Atuhoriazation", `bearer ${loggedUser.body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("Type wars");
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlog = {
      title: "Missing LIkes Property",
      author: "Atul Patel",
      url: "http://atulpatel.in",
    };
    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body.likes).toBe(0);
  });

  test("if the title and url properties are missing from the request data", async () => {
    const newBlog = {
      author: "Nirmal Patil",
      likes: 5,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deleting and updating blog", () => {
  test("deleting a single blog post", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("updating information of an induvudual blog post", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: 9,
    };
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    expect(response.body.likes).toBe(9);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
