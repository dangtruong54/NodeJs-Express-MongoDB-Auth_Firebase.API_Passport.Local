var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');

/* GET items listing. */
router.get('/', (req, res, next) => {
	ItemsModel.find({}).then( (items) => {
		res.render(
			'page/items/item-list',
			{ 
				title: 'Item List Page',
				items: items
			}
		);
	})
});

router.get('/add', function (req, res, next) {
	res.render('page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;