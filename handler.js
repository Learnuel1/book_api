 const { getSingleBook,
  getBookTitle,
  getBook,
  updateDetails,
  removeBook
} = require("./utils");

const fs = require("fs").promises;
const createfs = require("fs");    
const { json } = require("express");

exports.status = (req, res) => {
  res.statusCode = 200;
  const data = { "Status": "Ok" };
   res.end(JSON.stringify(data));
}
 
exports.books = async(req, res) => {
  try {  
    
    let found;
    const books = await fs.readFile("./books.json");
    res.writeHead(200, { "Content-Type": "application/json" }); 
    if (req.query.id && !req.query.title) { 
      found = getSingleBook(books.toString(), req.query.id);
    if(!found)
    { 
      res.statusCode = 404;
        res.end("Book Not Found");
      } else {
      res.end(JSON.stringify(found));
     }
     
      return;
    }
    else if (req.query.title && !req.query.id) { 
      
      found = getBookTitle(books.toString(), req.query.title);
     
       res.statusCode = 200;
      if (!found) {
        res.status (404).json({msg:"Book Not Found"}); 
      } else {
         res.end(JSON.stringify(found));
      }
      return;
    } else if (req.query.id && req.query.title) {
        
      const details = {
        book: books,
        title: req.query.title,
        id: req.query.id
      };
      found = getBook(details); 
       res.statusCode = 200;
      if (!found) {
         res.statusCode = 404;
          res.end("Book Not Found"); 
      } else {
         res.statusCode = 200;
         res.end(JSON.stringify(found));
      }
    } else {
       res.end(books.toString());
    }
   
  } catch (error) {
    console.log(`Reading User Error: ${error.message}`);
    res.statusCode = 500;
    res.end("Sorry, something went wrong while retrieving the data");
  }
}

exports.addBook = (req, res) => {
 
    createfs.readFile("./books.json", (err, books) => {
      if (err) {
        res.statusCode = 500;
        res.end("Opps! error occured while processing the book");
        return;
      };
 
      //read all existing books
      const existingBooks = JSON.parse(books.toString()); 
      //convert new book to json object
      const newBook = req.body;
      if (existingBooks.length===0) {
        newBook.id = 1;
      } else {
        newBook.id = existingBooks[existingBooks.length-1].id + 1;
      } 
      const date = new Date().toISOString();
      newBook.createdAt = date;
      newBook.updatedAt = date;
      // add new book to existing books
      existingBooks.push(newBook);

      //write the new data back to the file
      createfs.writeFile("./books.json", JSON.stringify(existingBooks), (err) => {
        if (err) {
          res.statusCode = 500;
          res.end("There was error while creating your book");
          return;
        }
        res.statusCode = 201;
        res.end("Book was added successfully");
      });
    });
}

exports.updateBook = (req, res) => {
    createfs.readFile("./books.json", (err, books) => {
      if (err) {
        res.statusCode = 500;
        res.end("Opps! error occured while processing the book");
        return;
      };
    
      let details = { 
        id: req.body.id,
      }  
      for (key in req.body) { 
        if (key !== "id") {
          details[key] = req.body[`${key}`];
        }
        details.updatedAt = new Date().toISOString();
      } 
     
      let updatedBook = JSON.parse( updateDetails( books,req.body.id)); 

      if (updatedBook.length===0) {
         res.statusCode = 200;
        res.end("Book was not found");
        return;
      } 
      updatedBook.push(details);
      //write the updated data back to the file
      createfs.writeFile("./books.json", JSON.stringify(updatedBook), (err) => {
        if (err) {
          res.statusCode = 500;
          res.end("There was error while updating your book");
          return;
        }
        res.statusCode = 204;
        res.end("Book was updated successfully");
      });
    });
}


exports.deleteBook = (req, res) => {
   
  createfs.readFile("./books.json", (err, books) => {
    if (err) {
      res.statusCode = 500;
      res.end("Opps! error occured while processing the book");
      return;
    };
    let search; 
    for (key in req.query) {
      search=req.query[`${key}`];
    }
       
    const details = {
      book: books,
      search: search
    };
    let updatedBook =removeBook(details);
    if (updatedBook.length === 0) {
      res.statusCode = 404;
      res.end("Book was not found");
      return;
    }
    
    //write the updated data back to the file
    createfs.writeFile("./books.json", updatedBook, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("There was error while updating your book");
        return;
      }
      res.statusCode = 204;
      res.end("Book was deleted successfully");
    });
  });
};

exports.notFound = (res, endpoint) => {
  const msg = `Opps! the endpoint '${endpoint}' was not found on the server`;
  res.statusCode = 404;
  res.end(msg);
   }