var passport = require('passport');
const UserModel = require(__base_schemas + '/user');
const Notify = require(__base_helper + '/notify');

module.exports = {
    // show the login form
    getLogin : function(req, res, next) {
        // res.render('page/publish/login', { 'title': Notify.LOGIN_PAGE, message: req.flash('loginMessage') });
        req.flash('warning',Notify.ERROR_LOGIN, false)
        res.render('page/publish/login', { 'title': Notify.LOGIN_PAGE });
    },

    // process the login form
    postLogin : function() {
        passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    })},

    // get profile when login
    getProfile : function(req, res) {
        res.render('page/publish/profile', {
            user : req.user // get the user out of session and pass to template
        });
    }
}