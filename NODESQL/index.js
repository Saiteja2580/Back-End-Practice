const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

//to create a connection with mysql database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodecon",
  password: "Saiteja@1964",
});

//insering bult data using faker
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    //avatar:faker.image.avatar(),
    faker.internet.password(),
    //birthDate : faker.date.birthdate(),
    //registeredAt : faker.date.past(),
  ];
};

//writing query to get data ffrom database
// let q = `insert into user(userId,username,email,password)values ?`;
// //to inser multiple values
// let users = [];
// for (let i = 0; i < 100; i++) {
//   users.push(getRandomUser());
// }
// //values will be filled for user array in place of question marks
// let qresult;
// try {
//   connection.query(q,[users],(err, result) => {
//     if (err) throw err;
//     //result is an array of objects
//     qresult = result;
//   });
// } catch (error) {
//   console.log(error);
// }
//connecting to database and accesing data
// connection.end();
// // console.log(getRandomUser());

//writing restful apis to perform crud operations on database
//writing home route
app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let resul = result[0];
      res.render("home.ejs", { resul });
    });
  } catch (error) {
    console.log("Some error occured");
    res.render("error.ejs");
  }
  //connection.end();
});
//creating view rpute to see all users
app.get("/user", (req, res) => {
  try {
    let q = "select userId,username,email from user";
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result;
      res.render("show.ejs", { data });
    });
  } catch (error) {
    res.render("error.ejs");
  }
  // connection.end();
});

//update route when we get a patch request
app.patch("/user/:id", (req, res) => {
  console.log(req.body);
  let id = req.params.id;
  let q = `select * from user where userId='${id}'`;
  let { username: formuser, password: formpass } = req.body;
  console.log(formuser, formpass);
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      console.log(data);
      if (formpass == data.password) {
        q2 = `update user set username='${formuser}' where userId='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) {
            throw err;
          }
          res.redirect("/user");
        });
      } else {
        res.send("<h1>Wrong Password</h1>");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//to send a form when we get a request to edit based on id
app.get("/user/:id/edit", (req, res) => {
  console.log("edit request");
  console.log(req.params);
  let q = `select * from user where userId='${req.params.id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let data = result[0];
      console.log(data);
      res.render("edit.ejs", { data });
    });
  } catch (error) {
    res.rendor("error.ejs");
  }
});

//create new user
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  let data = req.body;
  data.userId = faker.string.uuid();
  let q = `insert into user(userId,username,email,password)values(?,?,?,?)`;
  //let userdata = Object.values(data);
  let userdata = [data.userId, data.username, data.email, data.password];
  try {
    connection.query(q, userdata, (err, result) => {
      if (err) {
        throw err;
      }
      res.redirect("/user");
    });
  } catch (err) {
    res.render("error.ejs");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let id = req.params.id;
  res.render("delete.ejs", { id });
});

app.delete("/user/:id", (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;
  let q = `select * from user where userId='${req.params.id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      console.log(data);
      if (username === data.username && password === data.password) {
        let q2 = `delete from user where userId='${req.params.id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect('/user');
        });
      }
    });
  } catch (error) {
    res.render("error.ejs");
  }
});
