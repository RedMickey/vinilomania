module.exports = {
    name: "updateGood",
    curProduct:null,
    authors: null,
    genres: null,
    styles: null,
    labels: null,
    origins: null,
    prodtypes: null,
    run: function (req, res, next) {
        req.db.query('SELECT ID_author, author_name FROM authors')
            .then(rows => {
                authors = rows;
                return req.db.query('SELECT al.ID_album, au.ID_author, al.album_cover, al.alb_name, al.alb_price1, al.countdisk1, al.countdisk2, al.addition_pics, al.alb_price2, al.count1, al.count2, g.genre_name, au.author_name, s.style_name,al.ID_genre, al.ID_disktype1, al.ID_disktype2, al.ID_prodtype, org.origin_name, lb.label_name FROM albums al inner join authors au on al.ID_author=au.ID_author inner join styles s on al.ID_style=s.ID_style inner join genres g on al.ID_genre=g.ID_genre inner join labels lb on al.ID_label=lb.ID_label inner join origins org on al.ID_origin=org.ID_origin where al.ID_album=?', [req.params["id"]])
            })
            .then(rows => {
                curProduct = rows[0];
                console.log(curProduct);
                return req.db.query('SELECT * FROM genres')
            })
            .then(rows => {
                genres = rows;
                return req.db.query('SELECT * FROM styles')
            })
            .then(rows => {
                styles = rows;
                return req.db.query('SELECT * FROM labels')
            })
            .then(rows => {
                labels = rows;
                return req.db.query('SELECT * FROM origins')
            })
            .then(rows => {
                origins = rows;
                return req.db.query('SELECT * FROM prodtypes')
            })
            .then(rows => {
                prodtypes = rows;
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                res.render('extends/updateGood', {
                    authors: authors,
                    product: curProduct,
                    genres: genres,
                    styles: styles,
                    labels: labels,
                    origins: origins,
                    prodtypes: prodtypes
                });
                //console.log(novelties);
            })
            .catch(err => {
                console.log(err);
            })
    }

}