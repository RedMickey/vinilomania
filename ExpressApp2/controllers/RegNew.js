module.exports = {
    name: "RegNew",
    isUser: null,
    run: function (req, res, next) {
        req.db.query("SELECT IF(EXISTS (SELECT * FROM users WHERE email = ?),1,0) AS result", req.body.email )
            .then(row => {
                isUser = row[0].result;
                console.log(isUser);
                if (row[0].result == 0) {
                    console.log("insert");
                    return req.db.query("INSERT INTO users (login,password,email,user_name,user_surname,user_patronymic) VALUES (?)", [[req.body.login, req.body.password, req.body.email, req.body.name, req.body.surname, req.body.patronymic]]).
                        then(() => {
                            return req.db.close();
                        },
                        err => {
                            return req.db.close().then(() => { throw err; })
                        })
                }
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                if (isUser == 0)
                res.json({ "res": "0" });
                else
                res.json({ "res": "1" });
            })
            .catch(err => {
                console.log(err);
            })
    }

}