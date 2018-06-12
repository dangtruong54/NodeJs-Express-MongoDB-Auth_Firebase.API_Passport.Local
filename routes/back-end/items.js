var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');
const UtilsHelper = require('./../../helper/utils');

/* GET items listing. */
router.get('(/:status)?', (req, res, next) => {
	let requestStatus = req.params.status;
	requestStatus = (requestStatus == undefined) ? 'all' : requestStatus;

	let objWhere = {};

	if(requestStatus != 'all') objWhere = {status: requestStatus}
	console.log(objWhere);
	
	ItemsModel.find({status: 'inactive'}).then( (items) => {	
	
		const statusActive = UtilsHelper.statusHelper(items, requestStatus);
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
	res.render('./../views/page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;