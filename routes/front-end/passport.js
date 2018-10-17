var express = require('express');
var router = express.Router();

const Controller = require ( __base_controllers + '/front-end/index');

router.get('/', Controller.getLogin);

router.post('/',Controller.postLogin);

router.get('/', isLoggedIn, Controller.getProfile);

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;


