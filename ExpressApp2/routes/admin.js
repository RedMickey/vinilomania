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
// работа с файлами
var fs = require('fs-extra');
// работа с изображениями
var sharp = require('sharp');

var jsonParser = bodyParser.json();
var router = express.Router();

/*****************************************************multer_module*************************************************/
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/tmp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
})

var upload = multer({ storage: storage })


var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};

var attachFS = function (req, res, next) {
    req.fs = fs;
    next();
};

var attachSharp = function (req, res, next) {
    req.sharp = sharp;
    next();
};

router.get('/', attachDB, function (req, res, next) {
    console.log(req.session.passport.user.username);
    admGoods.run(req, res, next);
});

router.get('/add', attachDB, function (req, res, next) {
    addGood.run(req, res, next);
});

router.get('/update/:id', attachDB, function (req, res, next) {
    updateGood.run(req, res, next);
});

router.post('/delete', attachDB, attachFS, function (req, res) {
    deleteAlb.run(req, res);
});

router.post('/insert', attachDB, attachFS, attachSharp, function (req, res) {
    insertAlb.run(req,res);
});

router.post('/uploadImages', upload.fields([{ name: 'ImageCover', maxCount: 1 }, { name: 'additionalImages', maxCount: 10 }]), function (req, res) {
    res.sendStatus(200);
});

router.post('/update/updateQuery', attachDB, attachFS, attachSharp, function (req, res) {
    updateAlb.run(req, res);
});

module.exports = router;