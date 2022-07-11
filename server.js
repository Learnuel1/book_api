const http = require("http");
const { status,
  notFound,
  addBook,
  books,
  updateBook,
  deleteBook
} = require("./handler");

const PORT = 8000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const parsedUrl = new URL(`http://localhost:${PORT}${url}`);
  const endpoint = parsedUrl.pathname;
  const method = req.method;
  const params = parsedUrl.searchParams;

  switch (method) {
    case "GET":
      if (endpoint === "/status") {
        status(req, res);
      } else if (endpoint === "/books") { 
        
        books(req, res, params);
      }
      else {
        notFound(res, endpoint);
        }
      break;
    case "POST":
      if (endpoint === "/books/create") {
         
       addBook(req, res);
      }
      break;
    
    case "PUT": {
      if (endpoint === "/books/update") {
        updateBook(req, res);
      }
    }
      break;
    case "DELETE": {
      if (endpoint === "/books/delete") {
        deleteBook(req, res, params);
      }
    }
  }
});


server.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT}`);
})

