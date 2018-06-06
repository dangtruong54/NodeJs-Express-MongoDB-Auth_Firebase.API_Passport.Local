var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('page/dashboard/index', { title: 'DashBoards Page' });
});

module.exports = router;
