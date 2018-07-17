var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items');
const ItemsValidate = require('./../../validates/items');
const UtilsHelper = require('./../../helper/utils');
const Notify = require('./../../helper/notify');

const sysConfig = require('./../../configs/system');

var linkIndex = "/"  + sysConfig.systemAdmin + '/items';

const pageTitle = 'Item Manage';
const pageTitleAdd = pageTitle + '- Add';
const pageTitleEdit = pageTitle + '- Edit';



/* GET items listing. */
router.get('(/status/:status)?', (req, res, next) => {
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
		itemPerPage: 4,
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
						title: pageTitle + ' List',
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
		req.flash('info', Notify.UPDATE_STATUS, false);
		res.redirect(linkIndex);
	});
});

router.post('/change-status/:status', function (req, res, next) {
	let currentStatus = req.params.status ? req.params.status : '';
	ItemsModel.updateMany({ _id: {$in: req.body.cid} }, { status: currentStatus }, function (err, result) {		
		req.flash('success', Notify.DELETE_MULTIL_ITEM, false);
		res.redirect(linkIndex);
	});
});

router.get('/delete/:id', function (req, res, next) {
	let id = req.params.id ? req.params.id : '';

	ItemsModel.deleteOne({ _id: id }, function (err) {
		if (err) return handleError(err);
		req.flash('warning', Notify.DELETE_ITEM, false);
		res.redirect(linkIndex);
	});
});

router.post('/delete', function (req, res, next) {
	
	ItemsModel.remove({ _id: { $in: req.body.cid } }, function (err) {			
		if (err) return handleError(err);
		req.flash('warning', `Xoa ${req.body.cid.length} item thanh cong`, false);
		res.redirect(linkIndex);
	});
});

router.post('/save-ordering', function (req, res, next) {
	let id = req.body.cid ? req.body.cid : null;
	let ordering = req.body.ordering ? req.body.ordering : null;

	if(!Array.isArray(id)) {
		ItemsModel.updateOne({ _id: id }, { ordering: parseInt(ordering) }, function (err, result) {
			req.flash('info', Notify.UPDATE_ORDERING, false);
			res.redirect(linkIndex);
		});
	}else{
		id.map((item, index) => {
			ItemsModel.update({ _id: item }, { ordering: ordering[index]}, (err, affect, resp) => {
			});
		});
		req.flash('info', Notify.UPDATE_ORDERING, false);
		res.redirect(linkIndex);
	}	
});

router.post('/save', function (req, res, next) {
	let id = req.body.id ? req.body.id : '';
	let name = req.body.name ? req.body.name : '';
	let ordering = req.body.ordering ? req.body.ordering : 0;
	let status = req.body.status ? req.body.status : 'novalue';

	let item = { name: name, ordering: ordering, status: status };

	// Validation
	ItemsValidate.validates(req);

	let errors = req.validationErrors();
	
	if(errors !== false){ // error	
		res.render('./../views/page/items/form', { title: pageTitleAdd, errors, item });	
	} else { // no error
		if(id === '') {	
			new ItemsModel(item).save().then((err) => {	
				req.flash('info', Notify.ADD_ITEM, false);
				res.redirect(linkIndex);
			});
		} else {
			ItemsModel.update({ _id: id }, {name: name, ordering:  ordering, status: status}, (err, affect, resp) => {
				req.flash('info', Notify.UPDATE_ITEM, false);
				res.redirect(linkIndex);
			});		
		}
	}	
	
})

router.get('/add(/:id)?', function (req, res, next) {
	const id = (req.params.id !== '') ? req.params.id : '';
	let errors = null;	
	if(!id) {	
		let item = {name: '', ordering: 0, status: 'novalue'};
		res.render('./../views/page/items/form', { title: pageTitleAdd,item, errors });
	} else {
		ItemsModel
		.findById(id)
		.then((item) => {
			res.render(
				'page/items/form',
				{
					title: pageTitleEdit,
					item,	
					errors		
				}
			);
		})
	}		
});

module.exports = router;