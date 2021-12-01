const pool = require("../config/dbPool.js");

module.exports = (app) => {
    //middleware function
    const userAuth = (req, res, next) =>{
        if(!req.user){
            //if user is not logged in
            res.redirect("/login");
        }else{
            //if logged in
            next();
        }
    };

    //protected routes
    app.get('/dashboard', userAuth, (req, res) => {
        //Get last visited page from database and send that info to dashboard.ejs template.
        let sql = "SELECT lastVisited FROM users WHERE id = ?";
        let sqlParams = [req.session.passport.user.id];

        pool.query(sql, sqlParams, function(err, rows, fields) {
            if (err) console.log(err);
            // console.log(rows); //testing
            res.render("dashboard", { username : req.session.passport.user.name,
                                   lastVisited : rows.length > 0 ? rows[0].lastVisited : null});
        });
    });

    app.get('/sandbox', userAuth, (req, res) => {
        res.render("sandbox");
    });

    app.get('/lecture', userAuth, (req, res) => {
        res.render("lecture");
    });

    app.get("/chapter", userAuth, function(req, res){
        res.render("chapter");
    });

    app.get('/quizzes', userAuth, function(req , res){
        res.render('quizzes');
    });

    app.get('/quizzes/:id', function(req , res){
        res.render('quiz' + req.params.id);
    });
};
