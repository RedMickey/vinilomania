'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var basket = require('./../controllers/basket');
var mysql = require('mysql');
var router = express.Router();

/* GET basket page. */
/*var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};*/
router.get('/', function (req, res, next) {

    basket.run(req, res, next);
});

module.exports = router;