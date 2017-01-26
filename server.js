var express     = require('express');                                               // Getting express routing from node_modules
var app         = express();                                                        // Renaming express to app
var port        = process.env.PORT || 3000;                                         // Setting up port
var mongoose    = require('mongoose');                                              // Connecting to Mongo DB using mongoose
var morgan      = require('morgan');                                                // Getting Morgan to tell express to log events
var bodyParser  = require('body-parser');                                           // Using body pareser to take in json and be able to parser it into usable objects
var router      = express.Router();                                                 // Using express router for exporting modules and routing
var appRoutes   = require('./app/routes/api')(router);                              // Custom file for user signup informatiomn
var path        = require('path');                                                  // Using path to link certain file folders to the server file
var passport    = require('passport');
var social      = require('./app/passport/passport')(app, passport);

///// Set up Morgan middleware event logger /////
app.use(morgan('dev'));

///// Set up body parser middleware /////
app.use(bodyParser.json());                                                         // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));                                 // For parsing application/x-www-form-urlencoded

///// Express static route /////
app.use(express.static(__dirname + '/public'));                                     // Setting up static route to the public folder for app access

///// https://localhost:3000/api/newuser
app.use('/api', appRoutes);                                                         // Telling the server were to route for creating a new user

///// Configure Mongo database /////
mongoose.connect('mongodb://localhost:27017/loris_site', function (err) {           // Connecting to mongo DB and naming the database
    if (err) {
        console.log('Cannot connect to Mongo database at this time ' + err);
    } else {
        console.log('Connected to Mongo database!');
    }
});

///// Static index page /////
app.get('*', function (req, res) {                                                  // Setting a static route to the public folder for access to the user
    res.sendFile((path.join(__dirname + '/public/app/views/index.html')));
});

///// Listening for server connection on port 3000 /////
app.listen(port, function () {
    console.log('Connected to Node server on port: ' + port + '!');
});