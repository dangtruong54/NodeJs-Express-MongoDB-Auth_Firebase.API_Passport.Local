module.exports = {
    validates : (req) => {
        req.checkBody('name', 'Phai nam tu 5 den 20 ki tu').isLength({	 min: 5, max: 20 })
        req.checkBody('ordering', 'Phai la so lon hon 0 va nho hon 100').isInt({gt: 0, lt: 100});
        req.checkBody('status', 'Hay chon 1 trang thai').validateStatus('novalue');
    }
};