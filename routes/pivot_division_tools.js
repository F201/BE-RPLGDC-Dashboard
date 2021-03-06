const express = require('express')
const router = express.Router()
const Pivot = require('../models/pivot_division_tools')
const request = require('request')

router.get("/pivot_division_tools", (req, res) => {
    Pivot.findAll().then(product => {
        res.json({
            "data": product,
            "msg" : "GET success"
        })
    })
})

router.get("/pivot_division_tools/:idx", (req, res) => {
    Pivot.findOne({
        where: { idx : req.params.idx }
    }).then(pivot => {
        if (!pivot) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: pivot})
    })
})

router.post('/pivot_division_tools', (req, res) => {
    Pivot.create({
        id_divisi : req.body.id_divisi,
        id_tools : req.body.id_tools
    }).then(pivot => {
        res.json({
            "data": pivot,
            "msg" : "POST success"
        })
    })
})

router.put("/pivot_division_tools/:idx", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/pivot_division_tools/" + req.params.idx, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Pivot.update({
                id_divisi : req.body.id_divisi,
                id_tools : req.body.id_tools
            }, {
                where : { idx: req.params.idx },
                returning : true,
                plain : true
            }).then(affectedRow => {
                return Pivot.findOne({where: {idx: req.params.idx}})      
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

router.delete("/pivot_division_tools/:idx", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/pivot_division_tools/" + req.params.idx, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Pivot.destroy({where: {idx: req.params.idx}}).then(division => {
                res.json({msg : "data deleted"})
            })
        }
    })
})

module.exports = router