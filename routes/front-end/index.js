var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/login', require('./passport'));
router.use('/profile', require('./passport'));

module.exports = router;