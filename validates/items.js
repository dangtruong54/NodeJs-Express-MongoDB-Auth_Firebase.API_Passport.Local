const util = require('util');
const Notify = require('./../helper/notify');
var option = {
    name: { min: 5, max: 20},
    ordering: { min: 0, max: 100},
    status: { value: 'novalue'}
}

module.exports = {
    validates : (req) => {
        req.checkBody('name', util.format(Notify.ERROR_NAME, option.name.min, option.name.max)).isLength({ min: option.name.min, max: option.name.max })
        req.checkBody('ordering', util.format(Notify.ERROR_ORDERING, option.ordering.min, option.ordering.max)).isInt({gt: option.ordering.min, lt: option.ordering.max});
        req.checkBody('status', util.format(Notify.ERROR_STATUS)).validateStatus(option.status.value);
    }
};