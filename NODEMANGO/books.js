const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/amazon");
}

main()
  .then((res) => console.log("Connection success"))
  .catch((err) => console.log("error occured"));

//defining a schema using schema options
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1,"Price is too low for amazon seling"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["fiction", "non-fictinal"],
  },
  genre: {
    type: [String],
  },
});

const book = new mongoose.model("Book", bookSchema);

let book1 = new book({
  title: "Cengage",
  author: "Satyanarayan",
  price: 1500,
  category: "fiction",
});
book1
  .save()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

book
  .findByIdAndUpdate(
    "66b2540959b128a85b2afe23",
    { price: -100 },
    { runValidators: true }
  )
  .then((res) => console.log(res))
  //to customize the error we will use below mentioned syntax
  .catch((err) => console.log(err.errors.price.properties.message));
