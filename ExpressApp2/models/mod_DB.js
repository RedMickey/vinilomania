'use strict'
var express = require('express');
var mysql = require('mysql');

class Database {
    constructor() {
        var DB_settings = require('./DB_con.json');
        this.connection = mysql.createConnection({
            host: DB_settings.DB_HOST,
            user: DB_settings.DB_USERNAME,
            password: DB_settings.DB_PASSWORD,
            database: DB_settings.DB_DATABASE,
            multipleStatements: true
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

}

module.exports = Database;