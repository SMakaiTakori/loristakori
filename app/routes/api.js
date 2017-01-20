var User = require('../models/user');
module.exports = function (router) {
    // http://localhost:3000/api/newuser
    // USER REGISTRATION ROUTE
    router.post('/newuser', function (req, res) {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        if (req.body.firstName == null || req.body.firstName == '' ||
            req.body.lastName == null || req.body.lastName == '' ||
            req.body.email == null || req.body.email == '' ||
            req.body.username == null || req.body.username == '' ||
            req.body.password == null || req.body.password == '') {
            res.json({success: false, message: "Ensure all fields marked with an asterisk were filled out"})
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success: false, message: 'Username or E-mail already exist!'});
                } else {
                    res.json({success: true, message: 'User created'});
                }
            });
        }
    });
    // USER LOGIN ROUTE
    // http://localhoset:3000/api/authenticate
    router.post('/authenticate', function (req, res) {
        User.findOne({username: req.body.username}).select('email username password').exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Could not authenticate user'});
            } else if (user) {
                if(req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }
                if (!validPassword) {
                    res.json({ success: false, message: 'Could not authenticate password' })
                } else {
                    res.json({ success: true, message: 'User authenticated' });
                }
            }

        });
    });
    return router
};