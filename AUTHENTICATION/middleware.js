const isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "you have to log in to access the home page");
    return res.redirect("/login");
  }
  next();
};

module.exports = isLoggedin;
