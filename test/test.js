//Test modele firebase-auth-node npm
//using firebase-auth-node: https://www.npmjs.com/package/firebase-auth-node

let serviceKey = require( '../app/configs/firebase-service-key.json');
let firebaseConfig = require( '../app/configs/firebase-config.json');
let FirebaseAuth = require( '../helper/firebase-auth.js');
let assert = require('assert');

describe('test', () => {
    let firebaseAuth = new FirebaseAuth(firebaseConfig, serviceKey);

    it('signIn should return an object with idToken and uid', () => {
        return firebaseAuth.signIn('truongdx@beetsoft.com.vn', 'Truong@123')
            .then((res,) => {
                assert('object', typeof(res));
            });
    });

    it('createUser with firebase auth node', () => {
        return firebaseAuth.createUser('truongdx1@beetsoft.com.vn', 'Truong@123456')
            .then((res,) => {
                assert('object', typeof(res));
            });
    });

    it('signIn should return a an object code and message', () => {
        return firebaseAuth.signIn('fail', 'fail')
            .catch((err) => {
                assert('object', typeof(err));
            });
    });

    it('get info user with email', () => {
        return firebaseAuth.getUserByEmail('truongdx@beetsoft.com.vn')
            .catch((err) => {
                assert('object', typeof(err));
            })
    })

    it('authToken should return true if token is valid', () => {
        return firebaseAuth.signIn('truongdx@beetsoft.com.vn', 'Truong@123')
            .then((user) => {
                return firebaseAuth.authToken(user.idToken)
                    .then(() => {
                        return true;
                    });
                return true;
            });
    })

});