const mongoose = require("mongoose");
const { Schema } = mongoose;

const url = "mongodb://localhost:27017/relations";

async function main() {
  await mongoose.connect(url);
}

main()
  .then(() => console.log("Connection Success"))
  .catch((err) => console.log("Some error occured"));

const userSchema = Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

async function addUser() {
  let user1 = new User({
    name: "Sai Teja",
    email: "saitejassp2580@gmail.com",
  });

  await user1.save();
}

//addUser();

const postSchema = Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

async function addPost() {
  let user = await User.findOne({ name: "Sai Teja" });

  let post1 = new Post({
    content: "hi i am sai teja",
    likes: 43,
  });

  post1.user = user;

  await post1.save();
}

//addPost();

//find users using populate
async function findUser() {
  let res = await Post.find({}).populate("user");
  console.log(res);
}

findUser();
