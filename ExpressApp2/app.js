'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var database = require('./models/mod_DB');


var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var SessionStore = require('express-mysql-session')(session);


//var connect = require('connect');

var DB_settings = require('./DB_con.json');

var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var album = require('./routes/album');
var login = require('./routes/login');
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

var options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vinilomania',
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: new SessionStore(options)
}))

app.use(passport.initialize());
app.use(passport.session());



// *******************************************************авторизация**********************************************************************************************
passport.use('local', new LocalStrategy({
    usernameField: 'identifier',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, username, password, done) {
        if (!username || !password) { return done(null, false, req.flash( 'message', 'All fields are required.' )); }
        var db = new database();

        db.query("SELECT * FROM users WHERE login=?", username)
            .then(rows => {
                console.log(rows);
                if (!rows.length)
                {
                    return db.close().then(() => { return done(null, false, req.flash('message', 'Invalid username or password.')); })
                }

                if (password != rows[0].password)
                {
                    return db.close().then(() => { return done(null, false, req.flash('message', 'Invalid username or password.')); })
                }

                return db.close().then(() => { return done(null, rows[0]); })
                
            },err => {
                return db.close().then(() => { return done(req.flash('message', err)); })
            }
            )
    }
));

/*passport.use('local', new LocalStrategy({
    usernameField: 'identifier',
    passwordField: 'password'
    },
    function (username, password, done) {
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        if (username == "admin" && password == "admin") {
            return done(null, {
                username: "admin",
                photoUrl: "url_to_avatar",
                profileUrl: "url_to_profile"
            });
        }

        return done(null, false, {
            message: 'Неверный логин или пароль'
        });
    }
));*/

passport.serializeUser(function (user, done) {
    done(null, user.User_ID);
});


passport.deserializeUser(function (data, done) {
    var db = new database();

    db.query("SELECT * FROM users WHERE User_ID=?", user.User_ID)
        .then(rows => {
            return db.close().then(() => { return done(err, rows[0]); })
        },
        err => {
            return req.db.close().then(() => { throw err; })
        }
        )
        .catch(err => {
            console.log(err);
        })
});
//******************************************************************************************************************************************************************************
app.use('/', album);
app.use('/', routes);
app.use('/login', login);
app.use('/to/admin/panel', passport.authenticate('local', { failureRedirect: '/login'}), admin);
app.use('/registration', registration);
/*app.use('/:author/:albName', (req, res, next)=>{
    res.send('respond with a resource');
});*/
/*app.get('/:author/:albName', function (req, res, next) {
    res.send('respond with a resource');
});*/
//app.use('/:author/:albName', album);
app.use('/users', users);

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
