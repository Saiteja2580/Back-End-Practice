const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//when w recive data from post request we will use below 2 lines to make  data understandable by express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

let posts = [
  {
    id: uuidv4(),
    username: "Sai Teja",
    content: "I am passionate about programming",
  },
  {
    id: uuidv4(),
    username: "Achyuth",
    content: "Hardwork is success",
  },
  {
    id: uuidv4(),
    username: "Kowmudi",
    content: "I am a psychoo",
  },
  {
    id: uuidv4(),
    username: "Dhatri",
    content: "I am very short",
  },
];

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
//home page routing
app.get("/", (req, res) => {
  res.send("<h1>Server working well</h1>");
});

//cretaing a rstful api or view posts route
//api to view posts from array and rendering through views
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//rendering form to submit new post
app.get("/posts/new", (req, res) => {
  res.render("newform.ejs");
});
//to view single post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("individual.ejs", { post });
  } else {
    res.send(`<h1>404 Account Not Found</h1>`);
  }
});
//receving request from form throughpost request and adding it to the array
app.post("/posts", (req, res) => {
  posts.push({
    id: uuidv4(),
    username: req.body.user,
    content: req.body.content,
  });
  console.log(req.body);
  //res.send("Post request recieved");
  res.redirect("/posts");
});

//getting form to edit the post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("edit.ejs", { post });
  } else {
    res.send("error 404 not found");
  }
});
//editing the post and redirectiong to posts
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  if (post) {
    post.content = req.body.content;
    console.log(post);
    res.redirect("/posts");
  } else {
    res.send("error 404 not found");
  }
});
//destroying route or deleting the post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  if (post) {
    posts = posts.filter((pos)=>{
      return pos.id!=post.id;
    });
    console.log(posts);
    res.redirect("/posts");
  } else {
    res.send("error 404 not found");
  }
});
