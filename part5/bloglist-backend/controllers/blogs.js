const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log("authorization:", authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).send({ error: "content missing" });
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);
  console.log("token:", token);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const userId = decodedToken.id.toString();

  const blogToDelete = await Blog.findById(request.params.id);
  const blogId = blogToDelete.user.toString();

  if (userId === blogId) {
    await blogToDelete.remove();
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

module.exports = blogsRouter;
