var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');
var session          = require('express-session');
var jwt              = require('jsonwebtoken');
var secret           = 'CBAB340E4E';

module.exports = function (app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {secure: false}}));

    passport.serializeUser(function (user, done) {
        token = jwt.sign({username: user.username, email: user.email }, secret, {expiresIn: '24h'});
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: '373163943061292',
            clientSecret: 'deb0e92d4101d0dd02a845dd9d2bf7c7',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile._json.email);
            User.findOne({ email: profile._json.email }).select('firstName lastName username email password').exec(function (err, user) {
                if (err) done(err);

                if (user && user != null) {
                    done(null, user)
                } else {
                    done(err);
                }
            });
            done(null, profile);
        }
    ));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function (req, res) {
        res.redirect('/facebook/' + token);
    });
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    return passport;
};

