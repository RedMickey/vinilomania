'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var SessionStore = require('express-mysql-session')(session);

//*****************************************************multer_module*************************************************
/*var multer = require('multer');
//var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/tmp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
})

var upload = multer({ storage: storage })*/
//***************************************************************************************************************
var DB_settings = require('./DB_con.json');
var database = require('./models/mod_DB');

//*******************************************************************подключение маршрутов
var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var album = require('./routes/album');
var login = require('./routes/login');
var basket = require('./routes/basket');
var registration = require('./routes/registration');
var api = require('./routes/api');

var app = express();

//***************************************************** view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//**********************************************настройки соединение с бд для express-mysql-session
var options = {
    host: DB_settings.DB_HOST,
    user: DB_settings.DB_USERNAME,
    password: DB_settings.DB_PASSWORD,
    database: DB_settings.DB_DATABASE,
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

//****************************************************настройки сессий
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true },
    store: new SessionStore(options)
}))

app.use(passport.initialize());
app.use(passport.session());


// *******************************************************авторизация**********************************************************************************************
function isAuthenticated(req, res, next) {
    console.log("req.isAuthenticated " + req.isAuthenticated());
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

passport.use('local', new LocalStrategy({
    usernameField: 'identifier',
    passwordField: 'password',
    passReqToCallback: true
    },
    function (req, username, password, done) {
        if (!username || !password) { return done(null, false, { message: 'Неверный ввод.' }); }
        var db = new database();
        var resRow = null;
        db.query("SELECT * FROM users WHERE email=?", username)
            .then(rows => {
                console.log(rows);
                
                if (!rows.length)
                {
                    return db.close().then(() => { return done(null, false, { message: 'Неверное имя пользователя или пароль.' }); })
                }

                if (password != rows[0].password)
                {
                    return db.close().then(() => { return done(null, false, { message: 'Неверное имя пользователя или пароль.' }); })
                }
                return db.close().then(() => {return done(null, rows[0]); })
                
            },err => {
                return db.close().then(() => { return done(req.flash('message', err)); })
            }
            )
    }
));

passport.serializeUser(function (user, done) {
    console.log("serializeUser "+ user.User_ID);
    done(null, {
        username: (user.user_name && user.user_name != "") ? user.user_name : user.email,
        userID: user.User_ID,
        userRoleID: user.user_role_ID
    });
});


passport.deserializeUser(function (data, done) {
    var db = new database();
    console.log("DeserializeUser " + data.userID);
    var reqStr = null;
    db.query("SELECT * FROM users WHERE User_ID=?", data.userID)
        .then(rows => {
            reqStr = rows[0];
            return db.close();
        },
        err => {
            return db.close().then(() => { throw err; })
        }
        )
        .then(() => {
            return done(null, reqStr);
        })
        .catch(err => {
            console.log(err);
        })
});
//**************************************ROUTES***COMMON***************************************************************************************************************

app.use('/', album);
app.use('/', routes);
app.use('/to/admin/panel', isAuthenticated, isAdmin, admin);
app.use('/basket', basket);
app.use('/api', api);

/*app.post('/insert', upload.array('ImageCover',12), function (req, res) {
    res.sendStatus(200);
});*/

/*app.post('/insert', upload.fields([{ name: 'ImageCover', maxCount: 1 }, { name: 'additionalImages', maxCount: 10 }]), function (req, res) {
    res.sendStatus(200);
});*/

/*app.get('/kek', function (req, res) {
    res.render('kek', { });
});*/

//******************************************************************проверка_ролей*********************************************************************************
function isAdmin(req, res, next) {
    console.log("req.session.passport.user.userRoleID " + req.session.passport.user.userRoleID);
    if (req.session.passport.user.userRoleID == 2) {
        //console.log("NEXT!!!");
        return next();
    }
    
    res.redirect('/');
}

//*************************************ROUTES***LOGIN***LOGOUT***REGIST****************
app.use('/login', login);
app.use('/registration', registration);
app.get('/logout', isAuthenticated, function (req, res) {
    req.logout();
    //console.log("req.url" + req.url);
    res.redirect('/');
});


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
