module.exports = {
    name: "CurAlbum",
    alb: null,
    al_songs: null,
    identicals: null,
    run: function (req, res, next) {
        req.db.query('SELECT al.ID_album, au.ID_author, al.album_cover, al.alb_name, al.alb_price1, al.countdisk1, al.countdisk2, al.addition_pics, al.alb_price2, al.count1, al.count2, g.genre_name, au.author_name, s.style_name,al.ID_genre, al.ID_disktype1, al.ID_disktype2, al.ID_prodtype, org.origin_name, lb.label_name FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style inner join genres g on al.ID_genre=g.ID_genre inner join labels lb on al.ID_label=lb.ID_label inner join origins org on al.ID_origin=org.ID_origin where al.alb_name=?', [req.params["albName"]])
            .then(row => {
                alb = row;
                if (alb.length > 0) {
                    if (alb[0].addition_pics)
                        alb[0].addition_pics = alb[0].addition_pics.split(' ');
                    else
                        alb[0].addition_pics = [];
                }
                //return req.db.query('SELECT al.ID_album, al.album_cover, al.alb_name, al.alb_price1, al.alb_price2, al.count1, al.count2, au.author_name, s.style_name, al.ID_disktype1, al.ID_disktype2 FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style where al.ID_genre=12')
                return req.db.query('SELECT al.ID_album, au.ID_author, al.album_cover, al.alb_name, al.alb_price1, al.alb_price2, al.count1, al.count2, au.author_name, s.style_name, al.ID_disktype1, al.ID_disktype2 FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style where al.ID_genre=? and al.ID_album<>?', [alb[0].ID_genre, alb[0].ID_album])
            })
            .then(rows => {
                identicals = rows;
                return req.db.query('SELECT s.song_name, s.song_duration from songs s inner join albums al on s.ID_album=al.ID_album where al.alb_name=? ORDER BY s.number_in_alb', [req.params["albName"]])
            })
            .then(rows => {
                al_songs = rows;
                console.log(al_songs);
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                var _user = null;
                var _countGoods = null;
                var _sumPrice = null;
                if (req.session.passport) {
                    _user = req.session.passport.user;
                    _countGoods = req.countGoods;
                    _sumPrice = req.sumPrice;
                }
                res.render('extends/curalb', {
                    alb_c: alb[0],
                    songs: al_songs,
                    identicals_c: identicals,
                    user: _user,
                    countGoods: _countGoods,
                    sumPrice: _sumPrice
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
}