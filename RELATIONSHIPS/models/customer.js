const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

// Order.insertMany([
//   {
//     item: "Chips",
//     price: 100,
//   },
//   {
//     item: "Biscuits",
//     price: 150,
//   },
//   {
//     item: "Ice cream",
//     price: 120,
//   },
// ]);

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

//writing mongoose middlewares to delete the order when we delete user or customer from db
// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("Pre Middle Ware");
// });
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let res = await Order.deleteMany({
      _id: { $in: customer.orders },
    });
    console.log(res);
  }
});

const Customer = mongoose.model("Customers", customerSchema);

async function addCustomer() {
  let customer1 = new Customer({
    name: "Sai",
  });

  let order1 = new Order({
    item: "Burger",
    price: 250,
  });

  customer1.orders.push(order1);
  // customer1.orders.push(order2);
  await order1.save();
  // await order2.save();
  await customer1.save();
}

//addCustomer();

//using polulTE To find all the inner reference docs with comple docs not only ids of docs
// Customer.find({})
//   .populate("orders")
//   .then((res) => console.log(res));

//lets say we want to delete all posts whicha re related to an user or orders related to  all customers we will use mongoose middlewares or query middleware
//whenever the findByIdAndDelegte executed it triggers post or pre middle ware
async function delCustom() {
  let data = await Customer.findByIdAndDelete("66c35506ac178d262fa2497a");
  console.log(data);
}

delCustom();
