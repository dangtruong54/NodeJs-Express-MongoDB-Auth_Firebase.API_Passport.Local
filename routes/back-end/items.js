var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');
const UtilsHelper = require('./../../helper/utils');

/* GET items listing. */
router.get('(/:status)?', (req, res, next) => {
	let requestStatus = req.params.status;
	requestStatus = (requestStatus == undefined) ? 'all' : requestStatus;

	let requestQuery = '';
	requestQuery = req.query.keyword ? req.query.keyword : requestQuery;

	let objWhere = {};

	if(requestStatus != 'all') {
		objWhere = {
			status: requestStatus,
			name : new RegExp(requestQuery, 'i')
		}
	} else {
		objWhere = {			
			name : new RegExp(requestQuery, 'i')
		}
	};
	
	ItemsModel.find({}).then(function(items) {
		statusActive = UtilsHelper.statusHelper(items, requestStatus);
	})
	
	ItemsModel
		.find(objWhere)
		.sort({ordering: 'asc'})
		.then( (items) => {			
			res.render(
				'page/items/item-list',
				{ 
					title: 'Item List Page',
					items,
					statusActive,
					requestStatus,
					requestQuery			
				}
			);   
		})
	
});

router.get('/add', function (req, res, next) {
	res.render('./../views/page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;