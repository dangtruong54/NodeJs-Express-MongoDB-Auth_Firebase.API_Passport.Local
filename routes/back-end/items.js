var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');
const UtilsHelper = require('./../../helper/utils');

const sysConfig = require('./../../configs/system');

/* GET items listing. */
router.get('(/:status)?', (req, res, next) => {
	let requestStatus = "";
	requestStatus = req.params.status;
	requestStatus = (requestStatus == undefined) ? 'all' : requestStatus;

	let requestQuery = '';
	requestQuery = req.query.keyword ? req.query.keyword : requestQuery;

	let objWhere = {};

	if (requestStatus != 'all') {
		objWhere = {
			status: requestStatus,
			name: new RegExp(requestQuery, 'i')
		}
	} else {
		objWhere = { name: new RegExp(requestQuery, 'i') };
	};

	let currentPage = 1;
	currentPage = parseInt(req.query.page) ? parseInt(req.query.page) : currentPage;

	let totalItem = 1;

	let paramsPagination = {
		totalItem,
		currentPage,
		itemPerPage: 2,
		pageRanges: 3
	}
	let statusActive = [];

	ItemsModel.find({}).then(function (items) {
		statusActive = UtilsHelper.statusHelper(items, requestStatus);
	})

	ItemsModel.count(objWhere).then(function (items) {
		paramsPagination.totalItem = items;
		ItemsModel
			.find(objWhere)
			.sort({ ordering: 'asc' })
			.limit(paramsPagination.itemPerPage)
			.skip((paramsPagination.currentPage - 1) * paramsPagination.itemPerPage)
			.then((items) => {
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

router.get('/change-status/:id/:status', function (req, res, next) {
	let id = req.params.id ? req.params.id : '';
	let currentStatus = req.params.status ? req.params.status : '';

	let status = (currentStatus === 'active') ? 'inactive' : 'active';

	// ItemsModel.update({ _id: id }, { status:  status}, (err, affect, resp) => {
	// 	console.log(affect);
	// });

	// ItemsModel.findById(id).then( (item) => {
	// 	item.status = status;
	// 	item.save().then( (result) => {
	// 		res.redirect('/admin/items/');
	// 	});
	// });

	ItemsModel.updateOne({ _id: id }, { status: status }, function (err, result) {
		res.redirect(`/${sysConfig.systemAdmin}/items/`);
	});
});

router.get('/delete/:id', function (req, res, next) {
	let id = req.params.id ? req.params.id : '';

	ItemsModel.deleteOne({ _id: id }, function (err) {
		if (err) return handleError(err);
		res.redirect(`/${sysConfig.systemAdmin}/items/`);		
	  });
});

router.get('/delete', function (req, res, next) {
	
	ItemsModel.remove({ _id: { $in: req.body.cid}}, function (err) {
		if (err) return handleError(err);
		res.redirect(`/${sysConfig.systemAdmin}/items/`);		
	  });
});

router.get('/add', function (req, res, next) {
	res.render('./../views/page/items/item-add', { title: 'Add Item Page' });
});

module.exports = router;