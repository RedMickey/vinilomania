﻿module.exports = {
    name: "Admin",
    goods: null,
    run: function (req, res, next) {
        req.db.query('SELECT al.ID_album, au.ID_author, al.album_cover, al.alb_name, al.alb_price1, al.countdisk1, al.countdisk2, al.addition_pics, al.alb_price2, al.count1, al.count2, g.genre_name, au.author_name, s.style_name,al.ID_genre, pd.prodtype_name, al.ID_disktype1, al.ID_disktype2, al.ID_prodtype, org.origin_name, lb.label_name FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style inner join genres g on al.ID_genre=g.ID_genre inner join labels lb on al.ID_label=lb.ID_label inner join origins org on al.ID_origin=org.ID_origin inner join prodtypes pd on al.ID_prodtype=pd.ID_prodtype ORDER BY al.ID_album')
            .then(rows => {
                goods = rows;
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                res.render('extends/admGoods', { content: goods});
                //console.log(novelties);
            })
            .catch(err => {
                console.log(err);
            })
    }
}