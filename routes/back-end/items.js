var express = require('express');
var router = express.Router();

const Controller = require ( __base_controllers + '/back-end/index');

/* GET items listing. */
router.get('(/status/:status)?', Controller.getAllItem);

router.get('/change-status/:id/:status', Controller.changeStatusItem);

router.post('/change-status/:status', Controller.changeStatusMultiItem);

router.get('/delete/:id', Controller.deleteItem);

router.post('/delete', Controller.deleteMultiItem);

router.post('/save-ordering', Controller.saveOrdering);

router.post('/save', Controller.saveItem);

router.get('/add(/:id)?', Controller.addItem);

module.exports = router;