const express = require('express')
const Organizations = require('../models/organizations')
const router  = express.Router()
const { fileDir, upload }  = require('../middleware/uploadOrg')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')

router.get("/organizations", (req, res) => {
    Organizations.findAll().then(organizations => {
        res.json({data: organizations})
    })
})

router.get("/organizations/:org_id", (req, res) => {
    Organizations.findOne({
        where: { id_org_structures : req.params.org_id }
    }).then(organizations => {
        if (!organizations) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: organizations})
    })
})

router.post("/organizations", upload.single('foto_org_structures'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(403)
    }
    let fileData = await uploadFile.single(fileDir, req.file)
    Organizations.create({
        nama_org_structures: req.body.nama_org_structures,
        posisi_org_structures: req.body.posisi_org_structures,
        order_org_structures: req.body.order_org_structures,
        foto_org_structures: fileData.foto_org_structures === undefined ? "" : fileData.foto_org_structures
    }).then(organizations => {
        res.json({
            "data": organizations
        })
    })
})

router.put("/organizations/:org_id", upload.single('foto_org_structures'), (req, res) => {
    if (!req.file) {
        request(req.protocol+"://"+req.headers.host+"/organizations/"+req.params.org_id, { json: true }, async (err, res2, body) => {
            if (err) { return console.log(err) }
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    nama_org_structures: req.body.nama_org_structures,
                    posisi_org_structures: req.body.posisi_org_structures,
                    order_org_structures: req.body.order_org_structures,
                }
                Organizations.update(x, {
                    where : {
                        id_org_structures: req.params.org_id
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Organizations.findOne({where: {id_org_structures: req.params.org_id}})      
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
        request(req.protocol+"://"+req.headers.host+"/organizations/"+req.params.org_id, { json: true }, async (err, res2, body) => {
            if (err) { return console.log(err) }
            let fileData = await uploadFile.single(fileDir, req.file)
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    nama_org_structures: req.body.nama_org_structures,
                    posisi_org_structures: req.body.posisi_org_structures,
                    order_org_structures: req.body.order_org_structures,
                    foto_org_structures: fileData.foto_org_structures === undefined ? "" : fileData.foto_org_structures
                }
                fs.unlink(appDir + "/public/images/organizations/" + body.data.foto_org_structures, function(err) {
                    Organizations.update(x, {
                        where : {
                            id_org_structures: req.params.org_id
                        },
                        returning: true,
                        plain: true
                    }).then(affectedRow => {
                        return Organizations.findOne({where: {id_org_structures: req.params.org_id}})      
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

router.delete("/organizations/:org_id", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/organizations/"+req.params.org_id, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/organizations/" + body.data.foto_org_structures, function(err) {
                Organizations.destroy({
                    where: {
                        id_org_structures: req.params.org_id
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