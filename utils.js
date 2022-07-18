exports.getSingleBook = (book, id) => {
  const arr=JSON.parse(book);  
 return  arr.find(element => element.id === parseInt( id)  ); 
 
};
 
exports.getBookTitle = (book, title) => { 
  const arr=JSON.parse(book); 
  return  arr.find(element => element.title ===   title  ); 
};
// get book by id and title
exports.getBook = (details) => {
  const arr = JSON.parse(details.book);  
   return  arr.find(element => element.title.toLowerCase() === details.title.toLowerCase() &&  element.id === parseInt(details.id)); 
};
  
  exports.updateDetails = (books,id) => {
    const arr = JSON.parse(books);  
    const filtered = arr.filter(element => element.id !==parseInt( id));
    return JSON.stringify( filtered);
   
};

exports. removeBook = (details) => {
  const arr = JSON.parse(details.book);  
  
    const field = isNaN(details.search) ? details.title : details.id;
  
  
  if (isNaN(details.search)) {
    const found =arr.filter(element => element.title.toLowerCase() == details.search.toLowerCase());
    if (found.length === 0) {
      return found;
    }
    let search = arr.filter(element => element.title.toLowerCase() !== details.search.toLowerCase());
    return JSON.stringify( search);
  } else {
 const found = arr.filter(element => element.id === parseInt( details.search));
    if (found.length === 0) {
      return found;
    }
    let search = arr.filter(element => element.id !== parseInt( details.search));
    return JSON.stringify( search);
  }
  
};