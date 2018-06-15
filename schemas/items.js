const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ 
        name: String,
        status: String,
        ordering: Number
    });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('items', schema);