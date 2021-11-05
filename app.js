const express = require("express");
const pool = require("./dbPool.js");
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


//apis
app.get("/chapters", function(req, res){
    let sql = "SELECT * FROM chapters";

    pool.query(sql, function (err, rows, fields) {
        if (err) throw err;
        // console.log(rows); //testing
        res.send(rows);//sends data
    });
});

app.post("/admin/chapters/add", function(req, res){
    let sql = "INSERT INTO chapters (title, description) VALUES (?,?)";
    let sqlParams = [req.body.title, req.body.description];

    pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows); //testing
        res.send(rows);//sends data
    });
});

app.post("/admin/chapters/edit", function(req, res){
    let sql = "UPDATE chapters SET title = ?, description = ? WHERE id = ?";
    let sqlParams = [req.body.title, req.body.description, req.body.id];

    pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows); //testing
        res.send(rows);//sends data
    });
});

app.get("/pages", function(req, res){
    let sql;
    let sqlParams = [];

    switch(req.query.action){
        case "page":        sql = "SELECT * FROM pages WHERE id = ?";
                          sqlParams.push(req.query.id);
                          break;
        case "chapter":   sql = "SELECT * FROM pages WHERE chapter_id = ?";
                          sqlParams.push(req.query.id);
                          break;
    }

    pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) throw err;
        // console.log(rows); //testing
        res.send(rows);//sends data
    });
});

app.post("/admin/pages/add", function(req, res){
   let sql = "INSERT INTO pages (chapter_id, title, body) VALUES (?,?,?)";
   let sqlParams = [req.body.chapter_id, req.body.title, req.body.body];

   pool.query(sql, sqlParams, function(err, rows, fields) {
      if (err) throw err;
      // console.log(rows); //testing
      res.send(rows);//sends data
   });
});

app.post("/admin/pages/edit", function(req, res){
    let sql = "UPDATE pages SET title = ?, body = ? WHERE id = ?";
    let sqlParams = [req.body.title, req.body.body, req.body.id];

    pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows); //testing
        res.send(rows);//sends data
    });
});


//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});
