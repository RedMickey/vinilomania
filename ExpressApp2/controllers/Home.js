module.exports = {
    name: "Home",
    novelties: null,
    bestsellers: null,
    PreOrders: null,
    run: function (req, res, next) {
        req.db.query('SELECT al.ID_album, au.ID_author, al.album_cover, al.alb_name, al.alb_price1, al.alb_price2, al.count1, al.count2, au.author_name, s.style_name, al.ID_disktype1, al.ID_disktype2 FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style where al.ID_prodtype=1')
            .then(rows => {
                novelties = rows;
                return req.db.query('SELECT al.ID_album, al.album_cover, al.alb_name, al.alb_price1, al.alb_price2, al.count1, al.count2, au.author_name, s.style_name, al.ID_disktype1, al.ID_disktype2 FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style where al.ID_prodtype=2')
            })
            .then(rows => {
                bestsellers = rows;
                return req.db.query('SELECT al.ID_album, al.album_cover, al.alb_name, al.alb_price1, al.alb_price2, al.count1, al.count2, au.author_name, s.style_name, al.ID_disktype1, al.ID_disktype2 FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style where al.ID_prodtype=3')
            })
            .then(rows => {
                PreOrders = rows;
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                (req.session.passport) ? console.log(req.session.passport.user) : console.log("NO USER");
                var _user = null;
                var _countGoods = null;
                var _sumPrice = null;
                if (req.session.passport) {
                    _user = req.session.passport.user;
                    _countGoods = req.countGoods;
                    _sumPrice = req.sumPrice;
                }
                res.render('extends/index', {
                    content: [novelties, bestsellers, PreOrders],
                    tittles: ['новинки', 'бестселлеры', 'предзаказы'],
                    user: _user,
                    countGoods: _countGoods,
                    sumPrice: _sumPrice
                });
                //console.log(novelties);
            })
            .catch(err => {
                console.log(err);
            })
    }

}