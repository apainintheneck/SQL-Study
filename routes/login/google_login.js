const passport = require("passport");

module.exports = {
  getGoogleLogin: [passport.authenticate("google", { scope: ["profile"] })],

  handleGoogleLogin: [
    passport.authenticate("google", {
      failureRedirect: "/signup",
    }),
    function (req, res) {
      res.redirect("/dashboard");
    },
  ],
};
