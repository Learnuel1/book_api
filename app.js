const express = require("express"); 
const {connect} = require("mongoose");
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
  if (!req.body.title || !req.body.author || !req.body.price) {
    res.status(400).json({ msg: "invalid data" });
    return;
  }
  next();
});
app.post("/books/create", (req, res, next) => {
  addBook(req, res);
});
app.put("/books/update", (req, res, next) => {
  if (!req.body.id) {
    res.status(400).json({ msg: "invalid data" });
    return;
  }
  next();
});
app.put("/books/update", (req, res, next) => {
  updateBook(req, res);
});
app.delete("/books/delete", (req, res, next) => {
  if (!req.query.id && !req.query.title) {
    res.status(400).json({ msg: "bookid or/and title is required" });
    return;
  }  
  next();
});
app.delete("/books/delete", (req, res, next) => {
  deleteBook(req, res);
});

app.all("*", (err, req,res, next) => {
  res.status(400);
  next(err);
})
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ msg: err.messae });
})

const PORT = 8000;
const DBPORT = 27017;
const start = async () => { 
    await connect(`mongodb://localhost:${DBPORT}/books_db`);
    app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });
  }
start();


