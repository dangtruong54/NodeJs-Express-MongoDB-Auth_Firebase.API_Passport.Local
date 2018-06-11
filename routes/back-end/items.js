var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');

/* GET items listing. */
router.get('/', (req, res, next) => {
	ItemsModel.find({}).then( (items) => {
		const statusActive = [
			{name: 'All',count: 3, link: '#', class: 'default'},
			{name: 'Active',count: 2, link: '#', class: 'success'},
			{name: 'InActive',count: 1, link: '#', class: 'default'}
		]
		res.render(
			'page/items/item-list',
			{ 
				title: 'Item List Page',
				items: items,
				statusActive: statusActive
			}
		);
	})
});

router.get('/add', function (req, res, next) {
	res.render('page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;