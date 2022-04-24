const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

//custom morgan token
morgan.token("body", (req, res) => JSON.stringify(req.body));

//morgan format
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms   :body"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send('<h1>For Persons data click <a href="/api/persons">here</a>');
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "contact info is missing",
    });
  }

  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  const person = request.body;
  console.log(person);
  person.id = maxId + 1;

  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

//For catching request to unknown routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
