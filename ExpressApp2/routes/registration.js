'use strict';
var express = require('express');
var regNew = require('./../controllers/RegNew');

var database = require('./../models/mod_DB');
/*var mysql = require('mysql');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();*/

var router = express.Router();

var attachDB = function (req, res, next) {
    req.db = new database();
    next();
}

router.get('/', function (req, res) {
    res.render('registration');
});

router.post('/addNewUser', attachDB, function (req, res) {
    console.log("here!");
    regNew.run(req, res);
});

module.exports = router;