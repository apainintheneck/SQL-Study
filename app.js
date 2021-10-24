const express = require("express");
const app = express();

//Used to parse the body of a post request.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
  res.render("index");
});

//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("Express server is running...");
});
