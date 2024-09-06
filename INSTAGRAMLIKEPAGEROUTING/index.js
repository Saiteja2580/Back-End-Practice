const express = require("express");
const path = require("path");
const app = express();
const data = require("./data.json");

const port = 8080;
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

app.get("/", (req, res) => {
  console.log("hello");
  res.render("home.ejs");
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  let datauser = data[username];
  if (datauser) {
    console.log(datauser);
    res.render("insta.ejs", {
      datauser,
    });
  } else {
    res.render("error.ejs");
  }
});
