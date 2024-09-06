const mongoose = require("mongoose");
const Chat = require("./models/chat");

const dbUrl = "mongodb://localhost:27017/whatsapp";

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then((res) => console.log("Connection Success"))
  .catch((err) => console.log(err));

Chat.insertMany([
  {
    from: "Achyuth",
    to: "Sai Teja",
    message: "Hi Sai TEja",
    created_at: new Date(),
  },
  {
    from: "Aditys",
    to: "Sailesh",
    message: "Hi my love",
    created_at: new Date(),
  },
  {
    from: "Sai Teja",
    to: "Prashanth",
    message: "Kojjoda",
    created_at: new Date(),
  },
  {
    from: "Siram",
    to: "Karthik",
    message: "Chadukora Puka",
    created_at: new Date(),
  },
  {
    from: "Karthik",
    to: "Sriram",
    message: "Chadukuntale puka",
    created_at: new Date(),
  },
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// chat1
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Chat.findByIdAndUpdate("66b318f2ae26dc68d2518415", { message: "Hello Achyuth" })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
