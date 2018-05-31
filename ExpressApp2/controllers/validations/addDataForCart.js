'use strict';
var express = require('express');
var database = require('./../../models/mod_DB');
var mysql = require('mysql');

module.exports.addDataForCart = function (req, res, next) {
    console.log("Данные для корзины добавлены");
    if (req.isAuthenticated()) {
        var db = new database();
        db.query("SET @p0=?; CALL `calculSumAndCount`(@p0, @p1, @p2); SELECT @p1 AS `countGoods`, @p2 AS `sumPrice`;", [req.session.passport.user.userID])
            .then(rows => {
                //console.log(rows[2][0].countGoods);
                //console.log(rows[2][0].sumPrice);
                req.countGoods = rows[2][0].countGoods;
                req.sumPrice = rows[2][0].sumPrice;
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
}

