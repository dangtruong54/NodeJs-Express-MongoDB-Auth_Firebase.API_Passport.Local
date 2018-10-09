const mongoose = require('mongoose');
const collectionDB = require(__base_configs + '/database');

var schema = new mongoose.Schema({ 
        name: String,
        status: String,
        ordering: Number
    });

module.exports = mongoose.model(collectionDB.col_item, schema);