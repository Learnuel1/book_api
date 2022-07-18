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
  let found = []; 
  arr.map((curr, index) => {
    if (isNaN(details.search)) {
      if (curr.title.toLowerCase() === details.search.toLowerCase()) {
        found.push(curr); 
      arr.splice(index,1);
      }
    } else {
      if (curr.id ===parseInt(details.search)) {
       found.push(curr); 
      arr.splice(index,1); 
    }
    }
    
  });
  if (found.length === 0) {
    return [];
  } else {
     return arr;
  }
  
};