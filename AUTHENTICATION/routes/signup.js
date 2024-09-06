const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const passport = require("passport");

router
  .route("/")
  .get((req, res) => {
    res.render("signup.ejs");
  })
  .post(
    wrapAsync(async (req, res, next) => {
      let newuser = new User({
        name: req.body.user.name,
        username: req.body.user.username,
      });
      console.log(newuser);
      let userRegister = await User.register(newuser, req.body.user.password);
      req.flash("success_msg", "User Registered Successfully");

      res.redirect("/login");
    })
  );

module.exports = router;
