'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var admGoods = require('./../controllers/Admin');
var addGood = require('./../controllers/addGood');
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
    req.db.query("DELETE FROM albums WHERE ID_album = ?", req.body.deletedID)
        .then(rows => {
            return req.db.close();
        },
        err => {
            return req.db.close().then(() => { throw err; })
        }
        )
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
        })
});



router.post('/insert', attachDB, function (req, res) {

    if (!req.body.disktype1)
        req.body.disktype1 = 1;
    if (req.body.disktype1 == "on")
        req.body.disktype1 = 1;
    if (req.body.disktype2 == "on")
        req.body.disktype2 = 2;
    req.db.query("INSERT INTO albums (ID_author,alb_name,ID_disktype1, ID_disktype2,alb_price1,alb_price2,ID_style,ID_genre,ID_prodtype,count1,count2,countdisk1,countdisk2,ID_origin,ID_label) VALUES (?)", [[req.body.author, req.body.alb_name, req.body.disktype1, req.body.disktype2, req.body.alb_price1, req.body.alb_price2, req.body.style, req.body.genre, req.body.prodtype, req.body.count1, req.body.count2, req.body.countdisk1, req.body.countdisk2, req.body.origin, req.body.label]])
        .then(rows => {
            return req.db.close();
        },
        err => {
            return req.db.close().then(() => { throw err; })
        }
        )
        .then(() => {
            res.sendStatus(200);
            //console.log(req.body.alb_price2);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/update/updateQuery', attachDB, function (req, res) {

    if (req.body.disktype1 == "on")
        req.body.disktype1 = 1;
    if (req.body.disktype2 == "on")
        req.body.disktype2 = 2;
    //req.db.query("INSERT INTO albums (ID_author,alb_name,ID_disktype1, ID_disktype2,alb_price1,alb_price2,ID_style,ID_genre,ID_prodtype,count1,count2,countdisk1,countdisk2,ID_origin,ID_label) VALUES (?)", [[req.body.author, req.body.alb_name, req.body.disktype1, req.body.disktype2, req.body.alb_price1, req.body.alb_price2, req.body.style, req.body.genre, req.body.prodtype, req.body.count1, req.body.count2, req.body.countdisk1, req.body.countdisk2, req.body.origin, req.body.label]])
    req.db.query("UPDATE albums SET ID_author=?,alb_name=?,ID_disktype1=?, ID_disktype2=?,alb_price1=?,alb_price2=?,ID_style=?,ID_genre=?,ID_prodtype=?,count1=?,count2=?,countdisk1=?,countdisk2=?,ID_origin=?,ID_label=?  WHERE ID_album = ?", [[req.body.author], [req.body.alb_name], [req.body.disktype1], [req.body.disktype2], [req.body.alb_price1], [req.body.alb_price2], [req.body.style], [req.body.genre], [req.body.prodtype], [req.body.count1], [req.body.count2], [req.body.countdisk1], [req.body.countdisk2], [req.body.origin], [req.body.label], [req.body.updatedID]])
    .then(rows => {
            return req.db.close();
        },
        err => {
            return req.db.close().then(() => { throw err; })
        }
        )
        .then(() => {
            res.sendStatus(200);
            //console.log(req.body.alb_price2);
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;