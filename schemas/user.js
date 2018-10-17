var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model

var userSchema = mongoose.Schema({
    local : {
        email: String,
        password: String
    }
});

// methods ======================
// generating a hash

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null);
};

//  validate password
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);