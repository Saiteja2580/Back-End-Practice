const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const isLoggedin = require("./middleware");
const login = require("./routes/login");
const signup = require("./routes/signup");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
//defining session
const sessionOptions = {
  secret: "myCode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

//using passport-local strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = 8080;
const url = "mongodb://localhost:27017/authenUsers";
//connecting to mongodb
async function main() {
  mongoose
    .connect(url)
    .then(() => console.log("Connection Successful"))
    .catch((e) => console.log(e));
}
main();

//writing routess
app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
//using res locals
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//routing
app.use("/login", login);
app.use("/signup", signup);

app.get("/home", isLoggedin, (req, res) => {
  res.render("home.ejs");
});

app.get("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
  //next(err);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Inernal Server Error" } = err;
  //console.log(err);
  //res.status(status).send(message);
  res.render("error.ejs", { message });
});
