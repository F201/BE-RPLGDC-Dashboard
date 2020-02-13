const express = require('express')
const Socials = require('../models/socials')
const router = express.Router()
const request = require('request')

router.get("/socials", (req, res) => {
    Socials.findAll().then(socials => {
        res.json({data: socials})
    })
})

router.get("/socials/:id_social", (req, res) => {
    Socials.findOne({
        where: {id_social : req.params.id_social}
    }).then(division => {
        if (!division) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: division})
    })
})

router.post("/socials", (req, res) => {
    Socials.create({
        type : req.body.type,
        value : req.body.value
    }).then(social => {
        res.json({data : social})
    })
})

router.put("/socials/:id_social", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/socials/" + req.params.id_social, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Socials.update({
                type : req.body.type,
                value : req.body.value
            }, {
                where : { id_social: req.params.id_social },
                returning : true,
                plain : true
            }).then(affectedRow => {
                return Socials.findOne({where: {id_social: req.params.id_social}})      
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

router.delete("/socials/:id_social", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/socials/" + req.params.id_social, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Socials.destroy({where: {id_social: req.params.id_social}}).then(division => {
                res.json({msg : "data deleted"})
            })
        }
    })
})

module.exports = router