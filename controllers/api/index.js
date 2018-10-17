let serviceKey = require( '../../app/configs/firebase-service-key.json');
let firebaseConfig = require( '../../app/configs/firebase-config.json');
let FirebaseAuth = require( '../../helper/firebase-auth.js');

let firebaseAuth = new FirebaseAuth(firebaseConfig, serviceKey)

module.exports = {
    postLoginApi : (req, res, next) => {
        let email = JSON.stringify(req.body.email);
        let password = JSON.stringify(req.body.password);

        return firebaseAuth.signIn(email, password);
    }
}