module.exports = {
    name: "updateAlb",
    run: function (req, res, next) {
        if (req.body.disktype1 == "on")
            req.body.disktype1 = 1;
        if (req.body.disktype2 == "on")
            req.body.disktype2 = 2;
        console.log(req.body.covImg);
        console.log(req.body.addImgs);

        var imgCovName = "";
        var addImgNamesStr = "";
        //проверка на изменение старых картинок и удаление
        var dir = './public/albums-img/' + req.body.author + "/" + req.body.updatedID;
        if (req.body.addImgs === undefined)
            req.body.addImgs = [];
        if (req.body.covImg != "")
            imgCovName = req.body.covImg;
        var addImgsSmall = [];
        if (Array.isArray(req.body.addImgs)) {
            for (var i in req.body.addImgs) {
                addImgNamesStr += req.body.addImgs[i] + " ";
                addImgsSmall.push(req.body.addImgs[i].split('.').join('_s.'));
            }
        }
        else {
            addImgNamesStr += req.body.addImgs;
            addImgsSmall.push(req.body.addImgs.split('.').join('_s.'));
        }

        var fileList = req.fs.readdirSync(dir);
        for (var i in fileList) {
            if (!req.body.addImgs.includes(fileList[i]) && !addImgsSmall.includes(fileList[i])) {
                if (fileList[i]!=req.body.covImg && fileList[i]!=req.body.covImg.split('.').join('_s.'))
                    req.fs.remove(dir + "/" + fileList[i]);
            }
        }
        //подготовка к премещению новых картинок
        var dirTmp = './public/tmp';
        var imgCov = "ImageCover";
        var loadCov = false;
        var addImgNames = [];
        if (imgCovName == "" || addImgNamesStr == "") {
            var fileListTmp = req.fs.readdirSync(dirTmp);
            /*console.log('***********************************');
            console.log(fileListTmp);
            console.log('***********************************');*/
            for (var i in fileListTmp) {
                if (fileListTmp[i].indexOf(imgCov) != -1) {
                    imgCovName = fileListTmp[i];
                    loadCov = true;
                }
                else {
                    addImgNames.push(fileListTmp[i]);
                    addImgNamesStr += fileListTmp[i] + " ";
                }
            }
        }
        addImgNamesStr = addImgNamesStr.trim();

        req.db.query("UPDATE albums SET ID_author=?,alb_name=?,album_cover=?,addition_pics=?,ID_disktype1=?, ID_disktype2=?,alb_price1=?,alb_price2=?,ID_style=?,ID_genre=?,ID_prodtype=?,count1=?,count2=?,countdisk1=?,countdisk2=?,ID_origin=?,ID_label=?  WHERE ID_album = ?", [[req.body.author], [req.body.alb_name], [imgCovName], [addImgNamesStr],[req.body.disktype1], [req.body.disktype2], [req.body.alb_price1], [req.body.alb_price2], [req.body.style], [req.body.genre], [req.body.prodtype], [req.body.count1], [req.body.count2], [req.body.countdisk1], [req.body.countdisk2], [req.body.origin], [req.body.label], [req.body.updatedID]])
            .then(rows => {
                if (imgCovName != "" && loadCov) {
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
                return req.db.query("DELETE FROM songs WHERE ID_album = ?", req.body.updatedID)
            })
            .then(rows => {
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
                        req.db.query("INSERT INTO songs (song_name, song_duration, number_in_alb, ID_album) VALUES (?)", [[req.body.songName[i], req.body.duration[i], req.body.number[i], req.body.updatedID]]);
                    }
                }
                return req.db.close();
            },
            err => {
                return req.db.close().then(() => { throw err; })
            }
            )
            .then(() => {
                console.log("I'm here!");
                res.sendStatus(200);
            })
            .catch(err => {
                console.log(err);
            })
    }
}