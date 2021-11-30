const { handleLogout, postLogin, getLogin } = require('./login/login');
const { getFacebookLogin, handleFacebookLogin } = require('./login/facebook_login');
const { getGoogleLogin, handleGoogleLogin } = require('./login/google_login');
const { getRegister, submitRegister } = require('./login/register');

module.exports = (app) => {
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
}
