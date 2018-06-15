var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');
const UtilsHelper = require('./../../helper/utils');

/* GET items listing. */
router.get('(/:status)?', (req, res, next) => {
	let requestStatus = "";
	 	requestStatus = req.params.status;
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
		objWhere = {name : new RegExp(requestQuery, 'i')};
	};
	
	let currentPage = 1;
	currentPage =  parseInt(req.query.page) ? parseInt(req.query.page) : currentPage;

	let totalItem = 1;

	let paramsPagination = {
		totalItem,
		currentPage,
		itemPerPage: 2
	}
	let statusActive = [];

	ItemsModel.find({}).then(function(items) {
		statusActive = UtilsHelper.statusHelper(items, requestStatus);
	})		

	ItemsModel.count(objWhere).then(function(items) {
		paramsPagination.totalItem = items;
		ItemsModel
		.find(objWhere)
		.sort({ordering: 'asc'})
		.limit(paramsPagination.itemPerPage)
		.skip((paramsPagination.curentPage - 1) * paramsPagination.itemPerPage)
		.then( (items) => {			
			res.render(
				'page/items/item-list',
				{ 
					title: 'Item List Page',
					items,
					statusActive,
					requestStatus,
					requestQuery,
					paramsPagination			
				}
			);   
		})
	})
	
});

router.get('/add', function (req, res, next) {
	res.render('./../views/page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;