const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});

const books = require("./db");

// get
app.get("/books", (req, res) => {
  res.json(books);
});

// get id
app.get("/books/:id", (req, res) => {
  res.json(books.find((book) => book.id === req.params.id));
});

// post or insert new item
app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(201).json(req.body);
});

// update or change item with route id
app.put("/books/:id", (req, res) => {
  const updateIndex = books.findIndex((book) => book.id === req.params.id);
  res.json(Object.assign(books[updateIndex], req.body));
});

// delete item with route id
app.delete("/books/:id", (req, res) => {
  const deletedIndex = books.findIndex((book) => book.id === req.params.id);
  books.splice(deletedIndex, 1);
  res.status(204).send();
});
