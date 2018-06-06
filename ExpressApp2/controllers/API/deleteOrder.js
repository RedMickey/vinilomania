module.exports = {
    name: "deleteOrder",
    countOfGoods: null,
    sumPrice: null,
    run: function (req, res, next) {
        req.db.query("DELETE FROM orders WHERE ID_order = ?", req.body.id_order)
            .then(() => {
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