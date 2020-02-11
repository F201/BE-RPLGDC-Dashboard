const express = require('express')
const Tools = require('../models/tools')
const jwt = require('jsonwebtoken')
const router  = express.Router()
const {fileDir, upload}  = require('../middleware/uploadTools')
const auth = require('../middleware/auth')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')

router.get("/tools", (req, res) => {
    // console.log(req.headers.authorization)
    // jwt.verify(req.token, process.env.JWT_AUTH_CODE, (err, authData) => {
    //     if (err) {
    //         res.sendStatus(403)
    //     } else {
            Tools.findAll().then(tools => {
                res.json({data:tools})
            })
    //     }
    // })
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

router.post("/tools", upload.single('gambar_tools'), async (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE, async (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            let fileData = await uploadFile.single(fileDir, req.file)
            Tools.create({
                nama_tools: req.body.nama_tools,
                gambar_tools: fileData.gambar_tools === undefined ? "" : fileData.gambar_tools
            }).then(tools => {
                res.json({
                    "data": tools,
                    authData
                })
            })
        }
    })
})

router.put("/tools/:tools_id", upload.single('gambar_tools'), (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            request(req.protocol+"://"+req.headers.host+"/tools/"+req.params.tools_id, { json: true }, async (err, res2, body) => {
                if (err) { return console.log(err) }
                let fileData = await uploadFile.single(fileDir, req.file)
                let fs = require('fs')
                let path = require('path')
                let appDir = path.dirname(require.main.filename)
                if (body.data == undefined) {
                    res.json({"msg": "data not found"})
                } else {
                    const x = {
                        nama_tools: req.body.nama_tools,
                        gambar_tools: fileData.gambar_tools === undefined ? "" : fileData.gambar_tools
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
        }
    })
})

router.delete("/tools/:tools_id", auth, (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
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
        }
    })
})

module.exports = router