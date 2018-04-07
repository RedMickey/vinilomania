'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var album = require('./routes/album');
var login = require('./routes/login');
//var picture_ajax = require('./routes/pictures');
var registration = require('./routes/registration');

var app = express();

// view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/p', picture_ajax);
app.use('/', album);
app.use('/', routes);
app.use('/login', login);
app.use('/to/admin/panel' ,admin);
app.use('/registration', registration);
/*app.use('/:author/:albName', (req, res, next)=>{
    res.send('respond with a resource');
});*/
/*app.get('/:author/:albName', function (req, res, next) {
    res.send('respond with a resource');
});*/
//app.use('/:author/:albName', album);
app.use('/users', users);

/*app.post('/testt', (req, res) => {
    console.log("sdfsdfd");
});*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
