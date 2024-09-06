const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const port = 8080;

app.listen(port, (req, res) => {
  console.log(`App is listening at port ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "myScurityCode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/", (req, res) => {
  res.send("Session Initialized");
});

app.get("/register", (req, res) => {
  req.flash("Success", "User registered Successfuly");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.locals.msgs = req.flash('Success');
  res.render("flash.ejs");
});
