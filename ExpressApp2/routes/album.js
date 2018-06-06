'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var curAlbum = require('./../controllers/CurAlbum');
var findAlmById = require('./../controllers/API/getAlbumById');
var forCart = require('./../controllers/validations/addDataForCart');
var mysql = require('mysql');
var router = express.Router();

var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};

router.get('/goods/:author/:albName', forCart.addDataForCart, attachDB, function (req, res, next) {
    curAlbum.run(req, res, next);
    /*var catId = req.params["author"];
    var prodId = req.params["albName"];
    res.send(`Категория: ${catId}    Товар: ${prodId}`);
    res.send('respond with a resource');*/
});

module.exports = router;