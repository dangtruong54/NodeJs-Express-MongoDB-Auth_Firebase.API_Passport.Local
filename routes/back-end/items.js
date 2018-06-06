var express = require('express');
var router = express.Router();

/* GET items listing. */
router.get('/', function(req, res, next) {
  res.render('page/items/item-list', { title: 'Item List Page' });
});

router.get('/add', function(req, res, next) {
  res.render('page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;