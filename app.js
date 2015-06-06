var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// var jwt     = require('jsonwebtoken');

var config  = require('./config');

var routes  = require('./routes/index');
var api     = require('./routes/api')    ;

mongoose.connect(config.mongoUri, function(){
	console.log(config.mongoUri + ' is connected!');
});

var app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(logger('dev'));

app.use('/', routes);
app.use('/api', api);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
