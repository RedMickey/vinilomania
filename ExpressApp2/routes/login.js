'use strict';
var express = require('express');
var login = require('./../controllers/login');
var database = require('./../models/mod_DB');
var router = express.Router();

var attachDB = function (req, res, next) {
    req.db = new database();
    next();
}

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/authorize', attachDB, function (req, res) {
    login.run(req, res);
});

module.exports = router;