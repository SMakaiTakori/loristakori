var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var bcrypt     = require('bcrypt-nodejs');
var titlize    = require('mongoose-title-case');
var validate   = require('mongoose-validator');

var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z]+$/i
    })
];

var UserSchema = new Schema ({
    firstName: { type: String, required: 1, validate: nameValidator },
    lastName:  { type: String, required: 1, validate: nameValidator },
    email:     { type: String, required: 1, lowercasse : 1, unique: 1 },
    username:  { type: String, required: 1, unique: 1 },
    password:  { type: String, required: 1 }
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.plugin(titlize, {
    paths: [ 'firstName', { path: 'lastName' } ], // Array of paths
    trim: true
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);