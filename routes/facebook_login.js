const passport = require("passport");

module.exports = {
  getFacebookLogin: [passport.authenticate("facebook")],

  handleFacebookLogin: [
    passport.authenticate("facebook", {
      failureRedirect: "/signup",
    }),
    function (req, res) {
      res.redirect("/dashboard");
    },
  ],
};
