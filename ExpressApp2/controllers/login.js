module.exports = {
    name: "login",
    isUser: null,
    run: function (req, res, next) {
        req.db.query("SELECT * FROM users WHERE (email = ? OR login=?) AND password=?", [[req.body.identifier], [req.body.identifier], [req.body.password]])
            .then(row => {
                isUser = row[0];
                console.log(isUser);
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