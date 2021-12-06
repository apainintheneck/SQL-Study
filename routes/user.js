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
        res.render("dashboard");
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

    app.get('/resources', userAuth, function(req , res){
        res.render('resources');
    });

    app.get('/quizzes/:id', function(req , res){
        res.render('quiz' + req.params.id);
    });
};
