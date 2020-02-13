const express = require('express')
const News = require('../models/news')
const router  = express.Router()
const { fileDir, upload }  = require('../middleware/uploadNews')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')

router.get("/news", (req, res) => {
    News.findAll().then(news => {
        res.json({data: news})
    })
})

router.get("/news/:id_news", (req, res) => {
    News.findOne({
        where : {id_news : req.params.id_news}
    }).then(News => {
        if (!News) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: News})
    })
})

router.post("/news", upload.single('gambar'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(403)
    }
    let fileData = await uploadFile.single(fileDir, req.file)
    console.log('file',fileData)
    News.create({
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
        link_url: req.body.link_url,
        order_news: req.body.order_news,
        gambar: fileData.gambar === undefined ? "" : fileData.gambar
    }).then(News => {
        res.json({
            "data": News
        })
    })
})

router.put("/news/:id_news", upload.single('gambar'), (req, res) => {
    if (!req.file) {
        request(req.protocol+"://"+req.headers.host+"/news/"+req.params.id_news, { json: true }, (err, res2, body) => {
            if (err) { res.json({status: err}) }
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    judul: req.body.judul,
                    deskripsi: req.body.deskripsi,
                    link_url: req.body.link_url,
                    order_news: req.body.order_news
                }
                News.update(x, {
                    where : {
                        id_news: req.params.id_news
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return News.findOne({where: {id_news: req.params.id_news}})      
                }).then(b => {
                    res.json({
                        "status": "success",
                        "message": "data updated",
                        "data": b
                    })
                })
            }
        })
    } else {
        request(req.protocol+"://"+req.headers.host+"/news/"+req.params.id_news, { json: true }, async(err, res2, body) => {
            if (err) { return console.log(err) }
            let fileData = await uploadFile.single(fileDir, req.file)
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            if (body.data == undefined) {
                fs.unlink(appDir + "/public/images/News/" + req.file.filename)
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    judul: req.body.judul,
                    deskripsi: req.body.deskripsi,
                    link_url: req.body.link_url,
                    order_news: req.body.order_news,
                    gambar: fileData.gambar === undefined ? "" : fileData.gambar
                }
                fs.unlink(appDir + "/public/images/news/" + body.data.gambar, function(err) {
                    News.update(x, {
                        where : {
                            id_news: req.params.id_news
                        },
                        returning: true,
                        plain: true
                    }).then(affectedRow => {
                        return News.findOne({where: {id_news: req.params.id_news}})      
                    }).then(b => {
                        res.json({
                            "status": "success",
                            "message": "data updated",
                            "data": b
                        })
                    })
                })
            }
        })
    }
})

router.delete("/news/:id_news", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/news/"+req.params.id_news, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/news/" + body.data.gambar, function(err) {
                News.destroy({
                    where: {
                        id_news: req.params.id_news
                    }
                }).then(menu => {
                    res.json({
                        "msg": "data deleted"
                    })
                })
            })
        }
    })
})

module.exports = router