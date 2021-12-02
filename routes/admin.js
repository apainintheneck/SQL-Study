const pool = require("../config/dbPool.js");

module.exports = (app) => {
    //middleware function
    const adminAuth = (req, res, next) =>{
        if(!req.user){
            //if user is not logged in
            res.redirect("/login");
        }else if(!req.session.passport.user.admin){
            //If user is not admin
            res.redirect("/dashboard");
        } else {
            //if logged in
            next();
        }
    };

    app.get("/admin", adminAuth, function(req, res){
        res.render("admin");
    }); // "/admin"

    app.get("/admin/chapters/add", adminAuth, function(req, res){
        res.render("addChapter");
    }); // "/admin/chapters/add"

    app.get("/admin/pages/add", adminAuth, function(req, res){
        res.render("addPage");
    }); // "/admin/pages/add"

    app.get("/admin/chapters/edit", adminAuth, function(req, res){
        res.render("editChapter");
    }); // "/admin/chapters/edit"

    app.get("/admin/pages/edit", adminAuth, function(req, res){
        res.render("editPage");
    }); // "/admin/pages/edit"

    //Receives post form request
    app.post("/admin/chapters/add", adminAuth, function(req, res){
        let sql = "INSERT INTO chapters (title, description) VALUES (?,?)";
        let sqlParams = [req.body.title, req.body.description];

        pool.query(sql, sqlParams, function(err, rows, fields) {
            if (err) console.log(err);
            // console.log(rows); //testing
            res.render("admin");
        });
    }); // "/admin/chapters/add"

    //Receives post form request
    app.post("/admin/chapters/edit", adminAuth, function(req, res){
        let sql = "UPDATE chapters SET title = ?, description = ? WHERE id = ?";
        let sqlParams = [req.body.title, req.body.description, req.body.chapter];

        pool.query(sql, sqlParams, function(err, rows, fields) {
            if (err) console.log(err);
            // console.log(rows); //testing
            res.render("admin");
        });
    }); // "/admin/chapters/edit"


    //Receives post form request
    app.post("/admin/pages/add", adminAuth, function(req, res){
       let sql = "INSERT INTO pages (chapter_id, title, body) VALUES (?,?,?)";
       let sqlParams = [req.body.chapter, req.body.title, req.body.body];

       pool.query(sql, sqlParams, function(err, rows, fields) {
            if (err) console.log(err);
            // console.log(rows); //testing
            res.render("admin");
       });
    }); // "/admin/pages/add"

    //Receives post form request
    app.post("/admin/pages/edit", adminAuth, function(req, res){
        let sql = "UPDATE pages SET title = ?, body = ? WHERE id = ?";
        let sqlParams = [req.body.title, req.body.body, req.body.page];

        pool.query(sql, sqlParams, function(err, rows, fields) {
            if (err) console.log(err);
            // console.log(rows); //testing
            res.render("admin");
        });
    }); // "/admin/pages/edit"
};
