const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const passport = require("passport");

router
  .route("/")
  .get((req, res) => {
    res.render("login.ejs");
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(async (req, res) => {
      req.flash("success_msg", "user logged in successfully");
      res.redirect("/home");
    })
  );

module.exports = router;
