var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var bcrypt     = require('bcrypt-nodejs');

var UserSchema = new Schema ({
    firstName: { type: String, required: 1 },
    lastName:  { type: String, required: 1 },
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

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);