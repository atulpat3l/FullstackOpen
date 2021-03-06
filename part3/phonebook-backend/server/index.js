require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./model/Person");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

//custom morgan token
// eslint-disable-next-line no-unused-vars
morgan.token("body", (req, res) => JSON.stringify(req.body));

//morgan format
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms   :body"
  )
);

app.get("/", (request, response) => {
  response.send("<h1>For Persons data click <a href='/api/persons'>here</a>");
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

//For catching request to unknown routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
