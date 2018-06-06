'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var home = require('./../controllers/Home');
var mysql = require('mysql');
var forCart = require('./../controllers/validations/addDataForCart');
var router = express.Router();

/* GET home page. */
var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};

router.get('/', forCart.addDataForCart, attachDB, function (req, res, next) {
    
    home.run(req, res, next);   
});

/*router.get('/:author/:albName', function (req, res, next) {
    var catId = req.params["author"];
    var prodId = req.params["albName"];
    res.send(`Категория: ${catId}    Товар: ${prodId}`);
    res.send('respond with a resource');
});*/

module.exports = router;
