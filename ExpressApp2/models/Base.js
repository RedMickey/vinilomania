module.exports = function (db) {
    this.db = db;
};
module.exports.prototype = {
    exQuery: function (query) {
        this.db.query(query).
        then
    }
    setDB: function (db) {
        this.db = db;
    },
    content: null
}