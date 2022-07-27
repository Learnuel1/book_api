const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: String,
  author: String,
  price: Number,
  
},{timestamps: true});

const BookModel = model("book", BookSchema);

module.exports = BookModel;