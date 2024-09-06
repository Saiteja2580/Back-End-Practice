const express = require("express");
const app = express();

const port = 8080;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("This is home route");
});

// for query string www.google.com/search?q="querystring1&querystring2"

app.get("/search", (req, res) => {
  console.log(req.query);
  if (!req.query.q){
    res.send(`<h1>Nothing exists</h1>`);
  }
  res.send(`search results for ${req.query.q}`);
});

//now we can see the route from request using req.params and set it to variable

app.get("/:username", (req, res) => {
  console.log(req.params);
  console.log(`username : ${req.params.username}`);
  res.send(`${req.params.username} page recieved`);
});

app.get("/:username/:id", (req, res) => {
  console.log(req.params);
  console.log(`username : ${req.params.username}`);
  console.log(`id : ${req.params.id}`);
  res.send(`${req.params.username}  and ${req.params.id} page recieved`);
});
