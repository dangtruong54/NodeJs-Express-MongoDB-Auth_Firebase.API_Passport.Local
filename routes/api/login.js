var express = require('express');
var router = express.Router();

const apiController = require ( __base_controllers + '/api/index');

/* Post login */
router.post('/', apiController.postLoginApi);
module.exports = router;