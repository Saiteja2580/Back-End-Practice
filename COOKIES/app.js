const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("secretcode"));

const port = 3000;
const sessionOptions = {
  secret: "mySecretCode",
  resave: false,
  saveUninitialized: true,
};
//to savea session information
app.use(session(sessionOptions));

app.get("/test", (req, res) => {
  res.send("Test Successful");
});

//counting hoew many request using sessions
app.get("/reqCount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  res.send(`U sentrequest ${req.session.count} times`);
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

//saving userinfo using server sessions and using in browser

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  console.log(req.session.name);
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.send(`hello ${req.session.name}`);
});

// app.get("/", (req, res) => {
//   res.cookie("Hello", "This is a cookie");
//   res.send("This is home page");
// });

// app.get("/getCookie", (req, res) => {
//   console.dir(req.cookies);
// });

// //signed cokies used to save data fom tampering
// app.get("/getCookieSigned", (req, res) => {
//   res.cookie("made-in", "india", { signed: true });
//   res.send("Signed cookoe sent");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.cookies);
//   console.log(req.signedCookies);
//   res.send("verified");
// });

//express sessions
