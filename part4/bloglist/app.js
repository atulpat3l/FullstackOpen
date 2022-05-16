const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");
const logger = require("./utils/logger");
const middlware = require("./utils/middleware");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const app = express();

logger.info(`Connecting to: ${config.MongoDB_URI}`);

mongoose
  .connect(config.MongoDB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middlware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middlware.unknownEndpoint);
app.use(middlware.errorHandler);

module.exports = app;
