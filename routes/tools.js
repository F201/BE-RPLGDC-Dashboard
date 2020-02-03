const express = require('express')
const Tools = require('../models/tools')
const router  = express.Router()
const upload  = require('../middleware/uploadTools')
const request = require('request')

router.get("/tools", (req, res) => {
    Tools.findAll().then(tools => {
        res.json({data:tools})
    })
})

router.get("/tools/:tools_id", (req, res) => {
    Tools.findOne({
        where: { id_tools : req.params.tools_id }
    }).then(tools => {
        if (!tools) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: tools})
    })
})

router.post("/tools", upload.single('gambar_tools'), (req, res) => {
    Tools.create({
        nama_tools: req.body.nama_tools,
        gambar_tools: req.file === undefined ? "" : req.file.filename
    }).then(tools => {
        res.json({
            "data": tools
        })
    })
})

router.put("/tools/:tools_id", upload.single('gambar_tools'), (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/tools/"+req.params.tools_id, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        let fs = require('fs')
        let path = require('path')
        let appDir = path.dirname(require.main.filename)
        if (body.data == undefined) {
            fs.unlink(appDir + "/public/images/tools/" + req.file.filename)
            res.json({"msg": "data not found"})
        } else {
            const x = {
                nama_tools: req.body.nama_tools,
                gambar_tools: req.file === undefined ? "" : req.file.filename
            }
            fs.unlink(appDir + "/public/images/tools/" + body.data.gambar_tools, function(err) {
                Tools.update(x, {
                    where : {
                        id_tools: req.params.tools_id
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Tools.findOne({where: {id_tools: req.params.tools_id}})      
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

router.delete("/tools/:tools_id", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/tools/"+req.params.tools_id, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/tools/" + body.data.gambar_tools, function(err) {
                Tools.destroy({
                    where: {
                        id_tools: req.params.tools_id
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