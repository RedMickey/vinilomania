'use strict';
var express = require('express');
var database = require('./../models/mod_DB');
var home = require('./../controllers/Home');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
var attachDB = function (req, res, next) {
    req.db = new database();
    next();
};
router.get('/', attachDB,function (req, res, next) {
    //var db = new database();
    //var novelties;
    home.run(req, res, next);
        /*req.db.query('SELECT al.ID_album, al.album_cover, al.alb_name, al.alb_price1, al.alb_price2, al.count1, al.count2, au.author_name, s.style_name, al.ID_disktype1, al.ID_disktype2 FROM albums al inner join authors au on al.ID_author=au.ID_author inner join style s on al.ID_style=s.ID_style where al.ID_prodtype=1')
        .then(rows => {
            novelties = rows;
            return req.db.close();
        },
        err => {
            return req.db.close().then(() => { throw err; })
        }
        )
        .then(() => {
            res.render('index', { nov: novelties });
            console.log(novelties);
        })
        .catch(err => {
            console.log(err);
        })
    */
    
});

/*router.get('/:author/:albName', function (req, res, next) {
    var catId = req.params["author"];
    var prodId = req.params["albName"];
    res.send(`Категория: ${catId}    Товар: ${prodId}`);
    res.send('respond with a resource');
});*/

module.exports = router;
