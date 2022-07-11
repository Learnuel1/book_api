exports.getSingleBook = (book, id) => {
  const arr=JSON.parse(book); 
  let found=[];
  arr.map((curr) => {
    if (curr.id === parseInt(id) ) {
      found.push(curr); 
    }
    
  });
   return found;
};
 
exports.getBookTitle = (book, title) => {
  const arr=JSON.parse(book); 
  let found=[];
  arr.map((curr) => {
    if (curr.title.toLowerCase() === title.toLowerCase() ) {
      found.push(curr); 
    }
    
  });
   return found;
};
// get book by id and title
exports.getBook = (details) => {
  const arr = JSON.parse(details.book);  
  let found=[];
  arr.map((curr) => {
    if (curr.title.toLowerCase() === details.title.toLowerCase() && curr.id === parseInt(details.id)) {
      found.push(curr); 
    }
    
  });
   return found;
};
  
  exports.updateDetails = (details) => {
  const arr = JSON.parse(details.book);  
  let found=[];
  arr.map((curr) => {
    if (curr.id === parseInt(details.id)) {
      curr.title = details.title;
      curr.price = details.price;
      curr.updatedAt = new Date().toISOString(); 
      found.push(curr); 
    }
    
  });
  if (found.length === 0) {
    return [];
  } else {
     return arr;
  }
  
};

exports.removeBook = (details) => {
  const arr = JSON.parse(details.book);  
  let found=[];
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