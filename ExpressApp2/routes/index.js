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

/*function addDataForCart(req, res, next) {
    console.log("Данные для корзины добавлены");
    if (req.isAuthenticated()) {
        var db = new database();
        db.query("SET @p0=?; CALL `calculSumAndCount`(@p0, @p1, @p2); SELECT @p1 AS `countGoods`, @p2 AS `sumPrice`;", [req.session.passport.user.userID])
            .then(rows => {
                //reqStr = rows[0];
                console.log(rows[2][0].countGoods);
                console.log(rows[2][0].sumPrice);
                return db.close();
            },
            err => {
                return db.close().then(() => { throw err; })
            }
            )
            .then(() => {
            })
            .catch(err => {
                console.log(err);
            })

        return next();
    }
    else
        return next();
}*/

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
