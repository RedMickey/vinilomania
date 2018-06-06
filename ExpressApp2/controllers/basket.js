module.exports = {
    name: "Basket",
    _orders: null,
    _prices: null,
    _sumPrices: null,
    run: function (req, res, next) {
        if (req.isAuthenticated()) {
            _prices = [];
            _sumPrices = [];
            req.db.query('SELECT al.ID_album, au.ID_author, al.album_cover, al.alb_price1, al.alb_price2, al.alb_name, au.author_name, dt.disktype_n, ord.quantity, ord.ID_disktype, ord.ID_order FROM orders ord inner join albums al on ord.ID_album=al.ID_album inner join disktypes dt on ord.ID_disktype=dt.ID_disktype inner join authors au on al.ID_author=au.ID_author WHERE ord.ID_order_status=1 AND ord.User_ID=?', [req.session.passport.user.userID])
                .then(rows => {
                    _orders = rows;
                    console.log(_orders);
                    return req.db.close();
                },
                err => {
                    return req.db.close().then(() => { throw err; })
                }
                )
                .then(() => {
                    _user = req.session.passport.user;
                    _countGoods = req.countGoods;
                    _sumPrice = req.sumPrice;
                    for (var i in _orders) {
                        if (_orders[i].ID_disktype == 1) {
                            _prices.push(_orders[i].alb_price1);
                            _sumPrices.push(_orders[i].alb_price1 * _orders[i].quantity);
                        }
                        else {
                            _prices.push(_orders[i].alb_price2);
                            _sumPrices.push(_orders[i].alb_price2 * _orders[i].quantity);
                        }
                    }
                    res.render('extends/basket', {
                        orders: _orders,
                        user: _user,
                        countGoods: _countGoods,
                        sumPrice: _sumPrice,
                        prices: _prices,
                        sumPrices: _sumPrices
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            req.db.close();
            var _user = null;

            res.render('extends/basket', {
                user: _user
            });
        }
    }
}