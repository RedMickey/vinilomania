module.exports = {
    name: "insertAlb",
    curAlbID: null,
    run: function (req, res) {
        if (!req.body.disktype1)
            req.body.disktype1 = 1;
        if (req.body.disktype1 == "on")
            req.body.disktype1 = 1;
        if (req.body.disktype2 == "on")
            req.body.disktype2 = 2;
        var dirTmp = './public/tmp';
        var imgCov = "ImageCover";
        var imgCovName="";
        var addImgNames = [];
        var addImgNamesStr = "";
        var fileList = req.fs.readdirSync(dirTmp);
        console.log(fileList);
        for (var i in fileList) {
            if (fileList[i].indexOf(imgCov) != -1) {
                imgCovName = fileList[i];
            }
            else {
                addImgNames.push(fileList[i]);
                addImgNamesStr += fileList[i]+" ";
            }
        }
        addImgNamesStr=addImgNamesStr.trim();

        req.db.query("INSERT INTO albums (ID_author,alb_name,album_cover,addition_pics,ID_disktype1,ID_disktype2,alb_price1,alb_price2,ID_style,ID_genre,ID_prodtype,count1,count2,countdisk1,countdisk2,ID_origin,ID_label) VALUES (?)", [[req.body.author, req.body.alb_name, imgCovName, addImgNamesStr,req.body.disktype1, req.body.disktype2, req.body.alb_price1, req.body.alb_price2, req.body.style, req.body.genre, req.body.prodtype, req.body.count1, req.body.count2, req.body.countdisk1, req.body.countdisk2, req.body.origin, req.body.label]])
            .then(rows => {
                return req.db.query('SELECT al.ID_album FROM albums al WHERE al.alb_name = ?', [[req.body.alb_name]])
            })
            .then(rows => {
                curAlbID = rows[0];
                console.log(curAlbID);

                var dir = './public/albums-img/' + req.body.author + "/" + curAlbID.ID_album;
                req.fs.ensureDir(dir, err => {
                    console.log(err);
                })

                if (imgCovName != "") {
                    req.fs.moveSync(dirTmp + "/" + imgCovName, dir + "/" + imgCovName);
                    req.sharp(dir + "/" + imgCovName)
                        .resize(50, 50)
                        .toFile(dir + "/" + imgCovName.split('.').join('_s.'), err => { if (err) return console.error(err) });
                }

                for (var i in addImgNames) {
                    req.fs.moveSync(dirTmp + "/" + addImgNames[i], dir + "/" + addImgNames[i]);
                    req.sharp(dir + "/" + addImgNames[i])
                        .resize(50, 50)
                        .toFile(dir + "/" + addImgNames[i].split('.').join('_s.'), err => { if (err) return console.error(err) });
                } 

                if (req.body.number !== undefined) {
                    for (var i = 0; i < req.body.duration.length; i++) {
                        var shortage = 8 - req.body.duration[i].length;
                        console.log("shortage= " + shortage);
                        var timeAddStr = "";
                        for (var j = 1; j <= shortage; j++) {
                            if ((j % 3) == 0)
                                timeAddStr += ":";
                            else
                                timeAddStr += "0";
                        }
                        console.log("timeAddStr= " + timeAddStr);
                        req.body.duration[i] = timeAddStr + req.body.duration[i];
                    }

                    for (var i in req.body.songName) {
                        req.db.query("INSERT INTO songs (song_name, song_duration, number_in_alb, ID_album) VALUES (?)", [[req.body.songName[i], req.body.duration[i], req.body.number[i], curAlbID.ID_album]]);
                    }
                }
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                res.sendStatus(200);
                //console.log(req.body.alb_price2);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }