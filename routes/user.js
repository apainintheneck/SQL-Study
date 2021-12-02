module.exports = (app) => {
    //middleware function
    const userAuth = (req, res, next) =>{
        if(!req.user){
            //if user is not logged in
            res.redirect("/login");
        }else{
            //if logged in
            req.admin = req.session.passport.user.admin;
            next();
        }
    };

    //protected routes
    app.get('/dashboard', userAuth, (req, res) => {
        res.render("dashboard", {admin : req.admin});
    });

    app.get('/sandbox', userAuth, (req, res) => {
        res.render("sandbox", {admin : req.admin});
    });

    app.get('/lecture', userAuth, (req, res) => {
        res.render("lecture", {admin : req.admin});
    });

    app.get("/chapter", userAuth, function(req, res){
        res.render("chapter", {admin : req.admin});
    });

    app.get('/quizzes', userAuth, function(req , res){
        res.render('quizzes', {admin : req.admin});
    });

    app.get('/quizzes/:id', function(req , res){
        res.render('quiz' + req.params.id, {admin : req.admin});
    });
};
