const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport')(passport);
const flash = require('express-flash-messages');
const app = express();

//Used to parse the body of a post request.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require("./routes/public.js")(app);
require("./routes/login_register.js")(app);
require("./routes/user.js")(app);
require("./routes/admin.js")(app);
require("./routes/api.js")(app);

//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});
