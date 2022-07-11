const { getSingleBook,
  getBookTitle,
  getBook,
  updateDetails,
  removeBook
} = require("./utils");

const fs = require("fs").promises;
const createfs = require("fs");   

exports.status = (req, res) => {
  res.statusCode = 200;
  const data = { "Status": "Ok" };
   res.end(JSON.stringify(data));
}
 
exports.books = async(req, res, params) => {
  try {  
    
    let found;
    const books = await fs.readFile("./books.json");
    res.writeHead(200, { "Content-Type": "application/json" });
    let bookid, title;
    if (params.get("id") && !params.get("title")) {
      bookid = params.get("id"); 
         found = getSingleBook(books.toString(), bookid);
    if(found.length ===0)
    { 
      res.statusCode = 404;
        res.end("Book Not Found");
      } else {
      res.end(JSON.stringify(found));
     }
     
      return;
    }
    else if (params.get("title") && !params.get("id")) {
      
      title = params.get("title")
      found = getBookTitle(books.toString(), title);
       res.statusCode = 200;
      if (found.length === 0) {
        res.statusCode = 404;
         res.end("Book Not Found");
      } else {
         res.end(JSON.stringify(found));
      }
      return;
    } else if (params.get("id") && params.get("title")) {
       bookid = params.get("id");
      title = params.get("title");
      const details = {
        book: books,
        title: title,
        id: bookid
      };
      found = getBook(details);
       res.statusCode = 200;
      if (found.length === 0) {
         res.statusCode = 404;
         res.end("Book Not Found");
      } else {
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
  
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    createfs.readFile("./books.json", (err, books) => {
      if (err) {
        res.statusCode = 500;
        res.end("Opps! error occured while processing the book");
        return;
      };
 
      //read all existing books
      const existingBooks = JSON.parse(books.toString());
      //convert new book to json object
      const newBook = JSON.parse(data);
      newBook.id = existingBooks[existingBooks.length-1].id + 1;
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
  })
}

 
exports.updateBook = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    createfs.readFile("./books.json", (err, books) => {
      if (err) {
        res.statusCode = 500;
        res.end("Opps! error occured while processing the book");
        return;
      };
  
      const newDetails = JSON.parse(data); 
      const details = {
        book: books,
        id: newDetails.id,
        title: newDetails.title,
        price: newDetails.price
      }
      let updatedBook = updateDetails(details); 
      if (updatedBook.length === 0) {
         res.statusCode = 200;
        res.end("Book was not found");
        return;
      }
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
  })
}


exports.deleteBook = (req, res, params) => {
   
  createfs.readFile("./books.json", (err, books) => {
    if (err) {
      res.statusCode = 500;
      res.end("Opps! error occured while processing the book");
      return;
    };
    let search;
    if (!params.get("id") && !params.get("title")) {
      res.statusCode = 404;
      res.end(`{"error": "bookid is required"}`);
      return;
    } else if (params.get("id")) {
      search = params.get("id");
    } else {
       search = params.get("title");
    }
      
    const details = {
      book: books,
      search: search
      
    };
    let updatedBook = removeBook(details);
    if (updatedBook.length === 0) {
      res.statusCode = 404;
      res.end("Book was not found");
      return;
    }
    //write the updated data back to the file
    createfs.writeFile("./books.json", JSON.stringify(updatedBook), (err) => {
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