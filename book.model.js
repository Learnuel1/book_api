const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: String,
  author: String,
  price: Double,
  createdAt: Date,
  updatedAt: Date,
});

const BookModel = new Model("book", BookSchema);

exports.BookModel;