const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

const dbUrl = "mongodb://localhost:27017/whatsapp";

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then((res) => console.log("Connection Success"))
  .catch((err) => console.log(err));

const Chat = require("./models/chat.js");

const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`app is listenign at port ${port}`);
});

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

//home route defining
app.get("/", (req, res) => {
  res.render("home.ejs");
});

//serving chats to the request to show chats
app.get(
  "/chats",
  wrapAsync(async (req, res, next) => {
    let chatData = await Chat.find({});
    res.render("show.ejs", { chatData });
  })
);

//serving form to register in db
app.get("/chats/new", (req, res) => {
  res.render("registerForm.ejs");
});

//redirecting to home page after enttering chat details in db
app.post(
  "/chats",
  wrapAsync(async (req, res, next) => {
    let data = req.body;
    let chat = new Chat({
      from: data.from,
      to: data.to,
      message: data.message,
      created_at: new Date(),
    });
    await chat.save();

    res.redirect("/chats");
  })
);

//when we get an edit request we have to rener the form to edit message

app.get(
  "/chats/:id/edit",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs", { chat });
  })
);

//getting the form data from edit form and storing it in db
app.patch(
  "/chats/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let { message: formMsg } = req.body;
    await Chat.findByIdAndUpdate(
      id,
      { message: formMsg },
      { runValidators: true }
    );
    res.redirect("/");
  })
);

//destroy route
app.delete(
  "/chats/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/");
  })
);

app.get(
  "/chats/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "Chat not found"));
    }
    console.log(chat);
    res.send("This is a chat");
  })
);

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    console.log("You didnt enter the correct details please folow the rules");
  }
  next(err);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).send(message);
});
