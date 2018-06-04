var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/dashboards', function(req, res, next) {
  res.render('page/dashboard/index', { title: 'DashBoards Page' });
});

module.exports = router;
