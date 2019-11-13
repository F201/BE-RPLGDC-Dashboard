const express = require('express')
const Organizations = require('../models/organizations')
const router  = express.Router()
const upload  = require('../middleware/uploadOrg')
const request = require('request')

router.get("/api/v1/organizations", (req, res) => {
    Organizations.findAll().then(organizations => {
        res.json({data: organizations})
    })
})

router.get("/api/v1/organizations/:org_id", (req, res) => {
    Organizations.findOne({
        where: { id_org_structures : req.params.org_id }
    }).then(organizations => {
        if (!organizations) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: organizations})
    })
})

router.post("/api/v1/organizations", upload.single('foto_org_structures'), (req, res) => {
    Organizations.create({
        nama_org_structures: req.body.nama_org_structures,
        posisi_org_structures: req.body.posisi_org_structures,
        angkatan_org_structures: req.body.angkatan_org_structures,
        foto_org_structures: req.file === undefined ? "" : req.file.filename
    }).then(organizations => {
        res.json({
            "data": organizations
        })
    })
})

router.put("/api/v1/organizations/:org_id", upload.single('foto_org_structures'), (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/api/v1/organizations/"+req.params.org_id, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        let fs = require('fs')
        let path = require('path')
        let appDir = path.dirname(require.main.filename)
        if (body.data == undefined) {
            fs.unlink(appDir + "/public/images/organizations/" + req.file.filename)
            res.json({"msg": "data not found"})
        } else {
            const x = {
                nama_org_structures: req.body.nama_org_structures,
                posisi_org_structures: req.body.posisi_org_structures,
                angkatan_org_structures: req.body.angkatan_org_structures,
                foto_org_structures: req.file === undefined ? "" : req.file.filename
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
})

router.delete("/api/v1/organizations/:org_id", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/api/v1/organizations/"+req.params.org_id, { json: true }, (err, res2, body) => {
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