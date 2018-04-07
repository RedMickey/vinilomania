module.exports = {
    name: "addGood",
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
                res.render('extends/addGood', {
                    authors: authors,
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