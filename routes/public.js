module.exports = (app) => {
    //Unprotected routes
    app.get("/login", function(req, res){
        res.render("login");
    });

    app.get("/logout", function(req, res){
        req.logOut()
        res.redirect("/")
    });

    app.get("/", function(req, res){
        res.render("index");
    });// "/"
};
