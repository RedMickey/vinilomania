module.exports = {
    name: "deleteAlb",
    run: function (req, res, next) {
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
    }
}