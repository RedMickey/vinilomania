module.exports = {
    name: "addOrder",
    countOfGoods: null,
    sumPrice: null,
    run: function (req, res, next) {
        req.db.query("CALL add_order(?)", [[req.body.id_album, req.body.disc_type, req.session.passport.user.userID, req.body.date_time]])
        //req.db.query("SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; CALL `add_order`(@p0, @p1, @p2, @p3, @p4); SELECT @p4 AS `countGoods`;", [req.body.id_album, req.body.disc_type, req.session.passport.user.userID, req.body.date_time])
            .then(() => {
                //console.log(rows[5][0].countGoods);
                return req.db.query("SET @p0=?; CALL `calculSumAndCount`(@p0, @p1, @p2); SELECT @p1 AS `countGoods`, @p2 AS `sumPrice`;", [req.session.passport.user.userID])
            })
            .then(rows => {
                //console.log(rows[2][0].countGoods);
                //console.log(rows[2][0].sumPrice);
                countOfGoods = rows[2][0].countGoods;
                sumPrice = rows[2][0].sumPrice;
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                res.json(`{"countGoods": ${countOfGoods}, "sum": ${sumPrice}}`);
                //res.sendStatus(200);
            })
            .catch(err => {
                console.log(err);
            })
    }
}