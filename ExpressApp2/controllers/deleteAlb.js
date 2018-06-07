module.exports = {
    name: "deleteAlb",
    run: function (req, res, next) {
        req.db.query("DELETE FROM albums WHERE ID_album = ?", req.body.deletedID)
            .then(rows => {
                console.log("author_id - " + req.body.author_id);
                var dir = './public/albums-img/' + req.body.author_id + "/" + req.body.deletedID;
                req.fs.remove(dir, err => {
                    if (err) return console.error(err)
                });
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