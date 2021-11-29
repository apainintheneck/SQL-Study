const passport = require("passport");

module.exports = {

  getLogin: (req, res) => {
    var isLoginFailed = typeof req.query.login_failed !== "undefined";
    if (isLoginFailed) {
      req.flash("validation_errors", [{ msg: "Login has failed." }]);
    }
    res.render("login.ejs", {
      user: req.user,
    });
  },
  
  postLogin: [
    passport.authenticate("local", { failureRedirect: "/signup" }),
    (req, res) => {
      res.redirect("/dashboard");
    },
  ],
  
  handleLogout: (req, res) => {
    req.logout();
    res.redirect("/");
  }
  
};
