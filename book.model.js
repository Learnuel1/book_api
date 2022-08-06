const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {type: String, required:true, index:true},
  author: {type:String, required:true},
  price: {type:Number, required:true},
  
},{timestamps: true});

const BookModel = model("book", BookSchema);

module.exports = BookModel;