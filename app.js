 
const { json } = require("express");
const express = require("express"); 
const { status, books, deleteBook, addBook, updateBook } = require("./handler");
const app = express();
  
app.use(express.json()); 

app.get("/status", (req, res) => {
  status(req, res, req.params); 
});
app.get("/books", (req, res) => {  
  books(req, res);
});
app.post("/books/create", (req, res, next) => {
  //check if the body parameter has data 
  next();
});
app.post("/books/create", (req, res, next) => {
  addBook(req, res);
});
app.put("/books/update", (req, res, next) => {
  if (!req.body.id) {
    res.status(400).json({ error: "invalid data" });
    return;
  }
  next();
});
app.put("/books/update", (req, res, next) => {
  updateBook(req, res);
});
app.delete("/books/delete", (req, res, next) => {
  if (!req.query.id && !req.query.title) {
    res.status(404).json({ error: "bookid or/and title is required" });
    return;
  }
  next();
});
app.delete("/books/delete", (req, res, next) => {
  deleteBook(req, res);
});

app.use((err, req, res, next) => {
  console.log(req.url);
  res.status(500).JSON({ error: "Error occured" });
})


app.listen(8000, () => {
  console.log(`Server Running on http://localhost:${8000}`);
})