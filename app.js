 
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`middelware1: ${req.url}`);
  next();
});
app.use((req, res, next)=> {
  console.log(`Middleware2 : ${req.url}`);
  res.send(`from Middleware 2`);
});
app.use((req, res, next ) => {
  res.send(`form middleware3`);
});




app.listen(8000, () => {
  console.log(`Server Running on http://localhost:${8000}`);
})