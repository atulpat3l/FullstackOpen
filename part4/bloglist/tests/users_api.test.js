const helper = require("./test_helper");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

describe("check that invalid users are not created", () => {
  test("username and password having length less than 3 shoul respond with error", async () => {
    const newUser = {
      username: "ro",
      name: "Super User",
      password: "sekret",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "username and password lengths must be greater than 3"
    );
  });

  test("check if username is already present", async () => {
    const newUser = {
      username: "root",
      name: "Super User",
      password: "sekret",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain("username must be unique");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
