//imorting express packaging to express variable
//now app variable will acts as server side application which we cam send and recieve request and responses
const express = require("express");
const app = express();

//console.dir(app);

//port defines on which port our server is running if request from browser comes to this port the server will listen the request
const port = 8080;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

// app.use((req,res) => {
//     console.log(req);
//     console.log("Server is listening the request");

//     //res.send is used to send response like string and other typrof data

//     //res.send("Sending the response Hello World");

//     //we can send objects also but express converts it into json

//     /*res.send({
//         name : "Sai Teja",
//         age : 28
//     });*/

//     //we can send html also as response
//     /*let code = "<h1>Hello World</h1> <ul><li>Sai TEja</li><li>Achyuth</li></ul>";
//     res.send(code);*/

//     //we can send only one response
// });

/**
 now there are routes in the network we cant send multiple responss for the request which came from same route but we can send different responses for different routes
 */
let code = "";

app.get("/", (req, res) => {
  code = "<h1>You contacted route path</h1>";
  res.send(code);
});

app.post("/", (req, res) => {
  code = "<h1>You contacted route path through post request</h1>";
  res.send(code);
});
app.get("/home", (req, res) => {
  code = "<h1>You contacted home route path</h1>";
  res.send(code);
});

app.get("/media", (req, res) => {
  code = "<h1>You contacted media route path</h1>";
  res.send(code);
});

app.get("*", (req, res) => {
  res.send("This path does not exist");
});


app.get("/search",(req,res)=>{
  let {q} = req.query;
  res.send(q);
  console.log(q);
})