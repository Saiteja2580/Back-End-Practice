const express = require("express");
const ExpressError = require("./ExpressError");
const app = express();

const port = 8080;

// app.use((req, res,next) => {
//   let { query } = req.query;
//   console.log(query);
//   console.log("Hi Hello World");
//   console.log("I am 1st middle ware")
//   // when we call below method ot will send request to theroute in which request came
//   return next();
// });

// app.use((req, res,next) => {
//   let { query } = req.query;
//   console.log("I am 22nst middle ware")
//   // when we call below method ot will send request to theroute in which request came
//   return next();
// });

//creating utility middleware
//logger middle ware - morgan package
// app.use("/random", (req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.hostname, req.path, req.time);
//   return next();
// });
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hi i am root");
});

// app.get("/random", (req, res) => {
//   res.send("This is random page");
// });

//checking whther api token is present in query string or not
//access token is basicaly a password to access the api

// const checkToken = (req, res, next) => {
//   let { token } = req.query;
//   if (token == "giveaccess") {
//     next();
//   }
//   //throw new Error("Access Denied");
//   throw new ExpressError(401, "Access Denied");
// };

// app.get("/api", checkToken, (req, res) => {
//   res.send("This is data");
// });

//error handling using default express handler
app.get("/wrong", (req, res) => {
  abcd = abcd;
  throw new ExpressError("400", "Internal Server Error");
});



app.get('/admin',(req,res)=>{
  throw new ExpressError(403,"Access to admin is Forbidden");
});



//Error handling middleware
app.use((err, req, res, next) => {
  console.log("----------------ERROR----------------");
  let { status = 500, message = "Some Error Occured" } = err;

  res.status(status).send(message);
});

// app.use((req, res) => {
//   console.log("ERROR 2");
//   res.status(404).send("Page not found");
// });
