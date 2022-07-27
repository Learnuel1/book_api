const fs = require("fs").promises;
const createfs = require("fs");     
const BookModel = require("./book.model");

exports.status = (req, res) => {
   res.status(200).json({Status:"Ok"});
}
 
exports.books = async(req, res) => {
  try {  
     
    if (req.query.id && !req.query.title) { 
    const  book   = await BookModel.findById(req.query.id);
      if (!book) { 
        res.status(404).json({mgs:"Book was not found"});
      } else {
        res.status(200).json({ book });
     }
      return;
    }
    else if (req.query.title && !req.query.id) { 
      book   = await BookModel.findOne({title:req.query.title});
      if (!book) {
        res.status (404).json({msg:"Book Not Found"}); 
      } else {
         res.status(200).json({book});
      }
      return;
    } else if (req.query.id && req.query.title) {
      book   = await BookModel.find();
      if (!book) { 
          res.status(404).json({msg:"Book Not Found"}); 
      } else { 
         res.status(200).json({book});
      }
    } else {
       book   = await BookModel.find();
       if (!book) { 
          res.status(404).json({msg:"Book Not Found"}); 
      } else { 
         res.status(200).json({book});
      }
       
    }
   
  } catch (error) { 
    res.status(500).json({msg:"Sorry, something went wrong while retrieving the data"});
  }
}

exports.addBook = async (req, res) => {
  const book = await BookModel.create({...req.body});
  res.status(201).json({ msg: "Book added successfully" });
}

exports.updateBook = async(req, res) => {
     const book = await BookModel.findOne({_id:req.body.id}); 
      if (!book){
        res.status(404).json({ msg: "Book not found" });
        return; 
      }
  await BookModel.findByIdAndUpdate({ _id: req.body.id }, req.body);
  res.status(200).json({ msg: "Book updated successfully" });
      // for (const key in Object.keys( req.body)) {
      //   if (key !== "_id") {
      //     book[key] = req.body[key]
      //   }
      // } 
   //  await BookModel.saver();
       
}


exports.deleteBook = async (req, res) => {
   
  let search;
  for (key in req.query) {
    search = req.query[`${key}`];
  };
  let book = await BookModel.findOne({ _id: search });
  if (!book) {
    book = await BookModel.findOne({ title: search });
  }
  if (!book) {
    res.status(404).json({ msg: "Book was not found" });
    return;
  }
  const del = await BookModel.deleteOne({ _id: search });
  res.status(400).json({ msg: "book successfully deleted" });
};
