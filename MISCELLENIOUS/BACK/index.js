const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//this line is used to read from req.body when we recieve request from post method
app.use(express.urlencoded({extended : true}));
//this line is used to read data from a json object
app.use(express.json());

const port = 8080;

app.listen(port, () => {
  console.log(`Server is listenig  at port ${port}`);
});
//accessing form data using get method and sending response
app.get("/register", (req, res) => {
  console.log(req.query);
  let { username, password } = req.query;
  console.log(username);
  console.log(password);
  res.send(`Standard get response welcome ${username}`);
});
//acccessing form data using post method and sending response and accessing data through request body
app.post("/register", (req, res) => {
    let {username,password} = req.body;

  console.log(req.body);
  res.send(`Standard Post response,welcome ${username}`);
});
