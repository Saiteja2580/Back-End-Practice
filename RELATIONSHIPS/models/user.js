const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/relations";

async function main() {
  await mongoose.connect(url);
}

main()
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => console.log("Some error occured"));

main();

//defining one to few relation ship in which we store child document in the parent document

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  address: [
    {
      _id: false,
      location: String,
      pincode: Number,
    },
  ],
});

const user = mongoose.model("User", userSchema);

let user1 = new user({
  username: "Sai Teja",
  name: "Sai",
  address: [
    {
      location: "India",
      pincode: 516434,
    },
  ],
});

user1.address.push({ location: "Jammalamadugu", pincode: 631561 });
user1.save();

console.log(user1);
