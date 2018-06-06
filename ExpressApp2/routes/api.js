'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var api_getAlbumById = require('./../controllers/API/getAlbumById');
var api_getAlbumsByIds = require('./../controllers/API/getAlbumsByIds');
var api_addOrder = require('./../controllers/API/addOrder');
var api_deleteOrder = require('./../controllers/API/deleteOrder');
var api_updateOrder = require('./../controllers/API/updateOrder');
var mysql = require('mysql');
var router = express.Router();

/* GET basket page. */
var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};

router.post('/getAlbumById', attachDB, function (req, res, next) {

    console.log("/getAlbumById - HERE");
    api_getAlbumById.run(req, res, next);
});

router.post('/getAlbumsByIds', attachDB, function (req, res, next) {

    console.log("/getAlbumsByIds - HERE");
    api_getAlbumsByIds.run(req, res, next);
});

router.post('/addOrder', attachDB, function (req, res, next) {

    console.log("/addOrder - HERE");
    api_addOrder.run(req, res, next);
});

router.post('/deleteOrder', attachDB, function (req, res, next) {

    console.log("/deleteOrder - HERE");
    api_deleteOrder.run(req, res, next);
});

router.post('/updateOrder', attachDB, function (req, res, next) {

    console.log("/updateOrder - HERE");
    api_updateOrder.run(req, res, next);
});

module.exports = router;