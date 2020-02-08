const express = require('express')
const Achievements = require('../models/achievements')
const router  = express.Router()
const upload  = require('../middleware/uploadAchievements')
const request = require('request')

router.get("/achievements", (req, res) => {
    Achievements.findAll().then(achievements => {
        res.json({data: achievements})
    })
})

router.get("/achievements/:id_achievement", (req, res) => {
    Achievements.findOne({
        where : {id_achievement : req.params.id_achievement}
    }).then(achievements => {
        if (!achievements) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: achievements})
    })
})

router.post("/achievements", upload.single('foto_achievement'), (req, res) => {
    console.log('FILE',req)
    Achievements.create({
        judul: req.body.judul,
        nama_pemenang: req.body.nama_pemenang,
        jurusan: req.body.jurusan,
        tahun: req.body.tahun,
        peringkat: req.body.peringkat,
        foto_achievement: req.file === undefined ? "" : req.file.filename
    }).then(achievements => {
        res.json({
            "data": achievements
        })
    })
})

router.put("/achievements/:id_achievement", upload.single('foto_achievement'), (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/achievements/"+req.params.id_achievement, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        let fs = require('fs')
        let path = require('path')
        let appDir = path.dirname(require.main.filename)
        if (body.data == undefined) {
            fs.unlink(appDir + "/public/images/achievements/" + req.file.filename)
            res.json({"msg": "data not found"})
        } else {
            const x = {
                judul: req.body.judul,
                nama_pemenang: req.body.nama_pemenang,
                jurusan: req.body.jurusan,
                tahun: req.body.tahun,
                peringkat: req.body.peringkat,
                foto_achievement: req.file === undefined ? "" : req.file.filename
            }
            fs.unlink(appDir + "/public/images/achievements/" + body.data.foto_achievement, function(err) {
                Achievements.update(x, {
                    where : {
                        id_achievement: req.params.id_achievement
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Achievements.findOne({where: {id_achievement: req.params.id_achievement}})      
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
})

router.delete("/achievements/:id_achievement", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/achievements/"+req.params.id_achievement, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/achievements/" + body.data.foto_achievement, function(err) {
                Achievements.destroy({
                    where: {
                        id_achievement: req.params.id_achievement
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