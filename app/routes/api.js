var User           = require('../models/user');
module.exports     = function (router) {
    router.post('/newuser', function (req, res) {
    var user       = new User();
    user.firstName = req.body.firstName;
    user.lastName  = req.body.lastName;
    user.email     = req.body.email;
    user.username  = req.body.username;
    user.password  = req.body.password;
    if (req.body.firstName == null || req.body.firstName == '' ||
        req.body.lastName  == null || req.body.lastName  == '' ||
        req.body.email     == null || req.body.email     == '' ||
        req.body.username  == null || req.body.username  == '' ||
        req.body.password  == null || req.body.password  == '') {
        res.send('Ensure all fields marked with an asterisk were filled out')
    } else {
        user.save(function (err) {
            if (err) {
                res.send('Username or E-mail already exist!');
            } else {
                res.send('user created');
            }
        });
    }
});
    return router
}