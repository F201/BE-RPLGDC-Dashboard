const express = require('express')
const Activities = require('../models/activities')
const router  = express.Router()
const {fileDir, upload}  = require('../middleware/uploadActivities')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')

router.get("/activities", (req, res) => {
    Activities.findAll().then(activities => {
        res.json({data: activities})
    })
})

router.get("/activities/:id_activities", (req, res) => {
    Activities.findOne({
        where: { id_activities : req.params.id_activities }
    }).then(activities => {
        if (!activities) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: activities})
    })
})

router.post("/activities", upload.single('gambar_activities'), async(req, res) => {
    let fileData = await uploadFile.single(fileDir, req.file)
    Activities.create({
        nama_activities: req.body.nama_activities,
        tanggal: req.body.tanggal,
        deskripsi: req.body.deskripsi,
        gambar_activities: fileData.gambar_activities === undefined ? "" : fileData.gambar_activities
    }).then(activities => {
        res.json({
            "data": activities
        })
    })
})

router.put("/activities/:id_activities", upload.single('gambar_activities'), (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/activities/"+req.params.id_activities, { json: true }, async(err, res2, body) => {
        if (err) { return console.log(err) }
        let fileData = await uploadFile.single(fileDir, req.file)
        let fs = require('fs')
        let path = require('path')
        let appDir = path.dirname(require.main.filename)
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            const x = {
                nama_activities: req.body.nama_activities,
                tanggal: req.body.tanggal,
                deskripsi: req.body.deskripsi,
                gambar_activities: fileData.gambar_activities === undefined ? "" : fileData.gambar_activities
            }
            fs.unlink(appDir + "/public/images/activities/" + body.data.gambar_activities, function(err) {
                Activities.update(x, {
                    where : {
                        id_activities: req.params.id_activities
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Activities.findOne({where: {id_activities: req.params.id_activities}})      
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

router.delete("/activities/:id_activities", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/activities/"+req.params.id_activities, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/activities/" + body.data.gambar_activities, function(err) {
                Activities.destroy({
                    where: {
                        id_activities: req.params.id_activities
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