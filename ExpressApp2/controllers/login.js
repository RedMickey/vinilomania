module.exports = {
    name: "login",
    isUser: null,
    run: function (req, res, next) {
        req.db.query("SELECT * FROM users WHERE (email = ? OR login=?) AND password=?", [[req.body.identifier], [req.body.identifier], [req.body.password]])
            .then(row => {
                isUser = row[0];
                console.log(isUser);
                /*if (row[0].result == 0) {
                    console.log("insert");
                    return req.db.query("INSERT INTO users (login,password,email,user_name,user_surname,user_patronymic) VALUES (?)", [[req.body.login, req.body.password, req.body.email, req.body.name, req.body.surname, req.body.patronymic]]).
                        then(() => {
                            return req.db.close();
                        },
                        err => {
                            return req.db.close().then(() => { throw err; })
                        })
                }*/
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                res.sendStatus(200);
                //res.render('extends/admGoods', { content: goods });
            })
            .catch(err => {
                console.log(err);
            })
    }

}