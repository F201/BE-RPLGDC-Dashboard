const express = require('express')
const Divisions = require('../models/divisions')
const router = express.Router()
const request = require('request')

router.get("/divisions", (req, res) => {
    Divisions.findAll().then(divisions => {
        res.json({data: divisions})
    })
})

router.get("/divisions/:id_divisi", (req, res) => {
    Divisions.findOne({
        where: {id_divisi : req.params.id_divisi}
    }).then(division => {
        if (!division) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: division})
    })
})

router.post("/divisions", (req, res) => {
    Divisions.create({
        nama_divisi : req.body.nama_divisi,
        deskripsi : req.body.deskripsi
    }).then(division => {
        res.json({data : division})
    })
})

router.put("/divisions/:id_divisi", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/divisions/" + req.params.id_divisi, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Divisions.update({
                nama_divisi : req.body.nama_divisi,
                deskripsi : req.body.deskripsi
            }, {
                where : { id_divisi: req.params.id_divisi },
                returning : true,
                plain : true
            }).then(affectedRow => {
                return Divisions.findOne({where: {id_divisi: req.params.id_divisi}})      
            }).then(b => {
                res.json({
                    "status" : "success",
                    "message" : "data updated",
                    "data" : b
                })
            })
        }
    })
})

router.delete("/divisions/:id_divisi", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/divisions/" + req.params.id_divisi, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Divisions.destroy({where: {id_divisi: req.params.id_divisi}}).then(division => {
                res.json({msg : "data deleted"})
            })
        }
    })
})

module.exports = router