const express = require("express");
const pool = require("./dbPool.js");
const bodyParser = require('body-parser');
const mysql = require('mysql2'); 
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport')(passport);
const flash = require('express-flash-messages');
const app = express();


const { getHomePage } = require('./routes/index');
const { handleLogout, postLogin, getLogin } = require('./routes/login');
const { getFacebookLogin, handleFacebookLogin } = require('./routes/facebook_login');
const { getGoogleLogin, handleGoogleLogin } = require('./routes/google_login');
const { getRegister, submitRegister } = require('./routes/register');

//Used to parse the body of a post request.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connected to database');
});
// global.db = db;


//routes
app.get("/login", function(req, res){
  res.render("login");
});

//login, registration & authentication routes
app.post('/login', postLogin);
app.get('/login', getLogin);
app.get('/logout', handleLogout);

app.get('/signup', getRegister);
app.post('/signup', submitRegister);

app.get('/auth/facebook', getFacebookLogin);
app.get('/auth/facebook/callback', handleFacebookLogin);
app.get('/auth/google', getGoogleLogin);
app.get('/auth/google/callback', handleGoogleLogin);

  app.get("/dashboard", function(req, res){
    res.render("dashboard");
});

app.get("/sandbox", function(req, res){
    res.render("sandbox");
});

// app.get('/protected', (req, res) => {
//     res.send('Hello!');
// });

app.get("/lecture", function(req, res){
    res.render("lecture");
});

app.get("/chapter", function(req, res){
    res.render("chapter");
});

app.get("/", function(req, res){
    res.render("index");
});// "/"

app.get("/admin", function(req, res){
    res.render("admin");
}); // "/admin"

app.get("/admin/chapters/add", function(req, res){
    res.render("addChapter");
}); // "/admin/chapters/add"

app.get("/admin/pages/add", function(req, res){
    res.render("addPage");
}); // "/admin/pages/add"

app.get("/admin/chapters/edit", function(req, res){
    res.render("editChapter");
}); // "/admin/chapters/edit"

app.get("/admin/pages/edit", function(req, res){
    res.render("editPage");
}); // "/admin/pages/edit"

app.get('/quizzes', function(req , res){
    res.render('quizzes');
});


app.get('/quizzes/:id', function(req , res){
    res.render('quiz' + req.params.id);
});

/*
Two APIs for getting chapters from database.
1. /chapters?action=all
    -Returns all data from the chapters table.
2. /chapters?action=titles
    -Returns the id and title for every chapter
*/
app.get("/chapters", function(req, res){
    let sql;
    let sqlParams = [];
    switch (req.query.action) {
        case "all":       sql = "SELECT * FROM chapters";
                          break;
        case "titles":    sql = "SELECT id, title FROM chapters";
                          break;
        case "single":    sql = "SELECT * from chapters WHERE id = ?";
                          sqlParams = [req.query.id];
                          break;
        default:          res.status(400).send('Invalid API action');
                          return;
    }

    pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal database error');
        } else {
            // console.log(rows); //testing
            res.send(rows);//sends data
        }
    });
}); // "/chapters"

//Receives post form request
app.post("/admin/chapters/add", function(req, res){
    let sql = "INSERT INTO chapters (title, description) VALUES (?,?)";
    let sqlParams = [req.body.title, req.body.description];

    pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) console.log(err);
        // console.log(rows); //testing
        res.render("admin");
    });
}); // "/admin/chapters/add"

//Receives post form request
app.post("/admin/chapters/edit", function(req, res){
    let sql = "UPDATE chapters SET title = ?, description = ? WHERE id = ?";
    let sqlParams = [req.body.title, req.body.description, req.body.chapter];

    pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) console.log(err);
        // console.log(rows); //testing
        res.render("admin");
    });
}); // "/admin/chapters/edit"

/*
Three APIs for getting pages from database.
1. /pages?action=page&id={}
    -Returns a single page based upon the page_id
2. /pages?action=chapter&id={}
    -Returns an entire chapter of pages based upon the chapter_id
3. /pages?action=titles
    -Returns all titles in the format: page_title, page_id, chapter_title, chapter_id
*/
app.get("/pages", function(req, res){
    let sql;
    let sqlParams = [];

    switch(req.query.action){
        case "page":      sql = "SELECT * FROM pages WHERE id = ?";
                          sqlParams.push(req.query.id);
                          break;
        case "chapter":   sql = "SELECT * FROM pages WHERE chapter_id = ?";
                          sqlParams.push(req.query.id);
                          break;
        case "titles":    sql = `
                          SELECT ch.id AS chapter_id,
                                 ch.title AS chapter_title,
                                 p.id AS page_id,
                                 p.title AS page_title
                          FROM pages AS p
                          JOIN chapters AS ch
                              ON ch.id = p.chapter_id
                          ORDER BY ch.id, p.id
                          `;
                          break;
        default:          res.status(400).send('Invalid API action');
                          return;
    }

    pool.query(sql, sqlParams, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal database error');
        } else {
          // console.log(rows); //testing
          res.send(rows);//sends
        }
    });
}); // "/admin/pages"

//Receives post form request
app.post("/admin/pages/add", function(req, res){
   let sql = "INSERT INTO pages (chapter_id, title, body) VALUES (?,?,?)";
   let sqlParams = [req.body.chapter, req.body.title, req.body.body];

   pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) console.log(err);
        // console.log(rows); //testing
        res.render("admin");
   });
}); // "/admin/pages/add"

//Receives post form request
app.post("/admin/pages/edit", function(req, res){
    let sql = "UPDATE pages SET title = ?, body = ? WHERE id = ?";
    let sqlParams = [req.body.title, req.body.body, req.body.page];

    pool.query(sql, sqlParams, function(err, rows, fields) {
        if (err) console.log(err);
        // console.log(rows); //testing
        res.render("admin");
    });
}); // "/admin/pages/edit"


//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});
