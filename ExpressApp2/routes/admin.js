'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var admGoods = require('./../controllers/Admin');
var addGood = require('./../controllers/addGood');
var insertAlb = require('./../controllers/insertAlb');
var updateAlb = require('./../controllers/updateAlb');
var deleteAlb = require('./../controllers/deleteAlb');
var updateGood = require('./../controllers/updateGood');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
var router = express.Router();

var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};

router.get('/', attachDB, function (req, res, next) {
    admGoods.run(req, res, next);
});

router.get('/add', attachDB, function (req, res, next) {
    addGood.run(req, res, next);
});

router.get('/update/:id', attachDB, function (req, res, next) {
    updateGood.run(req, res, next);
});

router.post('/delete', attachDB, function (req, res) {
    deleteAlb.run(req, res);
});

router.post('/insert', attachDB, function (req, res) {
    insertAlb.run(req,res);
});

router.post('/update/updateQuery', attachDB, function (req, res) {
    updateAlb.run(req, res);
});

module.exports = router;