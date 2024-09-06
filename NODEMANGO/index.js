const mongoose = require("mongoose");

let url = "mongodb://localhost:27017/college";
//to connect to db using mongoose
main()
  .then((result) => {
    console.log(result);
    console.log("Connection succeded");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(url);
}
//schema - defines shape of the document in that colection

const studentSchema = new mongoose.Schema({
  regno: String,
  name: String,
  dept: String,
  email: String,
});
//creates a colection in db
const Student = mongoose.model("Student", studentSchema);

//to inser and save the doc in students collection
const st1 = new Student({
  regno: "11229a021",
  name: "Sai Teja",
  dept: "cse",
  email: "saitejassp2580@gmail.com",
});
// st1.save();

const st2 = new Student({
  regno: "11229a014",
  name: "Achyuth",
  dept: "cse",
  email: "achyuth2580@gmail.com",
});
// st2
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//to inser many in the collection
// Student.insertMany([
//   { regno: "11229a02222", name: "Kowmudi", dept: "ECE", email: "abc@gmail" },
//   { regno: "11229a011", name: "Dhatri", dept: "ECE", email: "def@gmail" },
//   { regno: "11229a0333", name: "Kedar", dept: "cse", email: "xyz@gmail" },
// ])
// .then((res) => console.log(res))
// .catch((err) => console.log(err));

//finding or reading the documents
// Student.find({})
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

//finding docs where name = Achyuth
// Student.find({ name: "Achyuth" })
//   .then((result) => console.log(result[0].dept))
//   .catch((err) => console.log(err));

// //using id
// Student.findById("66b1af55b012945439855efb")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//updating the docs in mongoose using model.updateOne amd model.updateMany
// Student.updateOne({ name: "Kedar" }, { regno: "11229a007" })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Student.updateMany({ dept: "ECE" }, { dept: "cse" })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//updatimg using findOneAndUpdate() amd findByIdAndUpdate()
// Student.findOneAndUpdate({ name: "Achyuth" }, { dept: "ECE" }, { new: true })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//deleting documnets using deleteOne and deleteMany
// Student.deleteOne({ name: "Kedar" })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

Student.deleteMany({ dept: "ECE" })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
