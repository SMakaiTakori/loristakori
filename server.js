var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var mongoose    = require('mongoose');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var router      = express.Router();
var appRoutes   = require('./app/routes/api')(router);
var path        = require('path');

///// Set up Morgan middleware /////
app.use(morgan('dev'));

///// Set up body parser middleware /////
app.use(bodyParser.json());                                                          // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));                                  // for parsing application/x-www-form-urlencoded

///// Express static route /////
app.use(express.static(__dirname + '/public'));

///// https://localhost:3000/api/newuser
app.use('/api', appRoutes);

///// Configure Mongo database /////
mongoose.connect('mongodb://localhost:27017/loris_site', function (err) {
    if (err) {
        console.log('Cannot connect to Mongo database at this time ' + err);
    } else {
        console.log('Connected to Mongo database!');
    }
});

///// Static index page /////
app.get('*', function (req, res) {
    res.sendFile((path.join(__dirname + '/public/app/views/index.html')));
});

///// Listening for server connection on port 3000 /////
app.listen(port, function () {
    console.log('Connected to Node server on port: ' + port + '!');
});