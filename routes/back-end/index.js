var express = require('express');
var router = express.Router();
const checkLogIn = require(__base_authentication + '/passport')

router.use('/', require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', checkLogIn.isLoggedIn, require('./items'));

module.exports = router;