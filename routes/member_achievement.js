const express = require('express')
const Member = require('../models/member_achievement')
const router = express.Router()
const request = require('request')
const jwt = require('jsonwebtoken')

router.get("/member_achievement", (req, res) => {
    Member.findAll().then(socials => {
        res.json({data: socials})
    })
})

router.get("/member_achievement/:id_member", (req, res) => {
    Member.findOne({
        where: {id_member : req.params.id_member}
    }).then(member => {
        if (!member) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: member})
    })
})

router.post("/member_achievement", (req, res) => {
    Member.create({
        nama_member : req.body.nama_member,
        jurusan : req.body.jurusan,
        id_achievement : req.body.id_achievement
    }).then(member => {
        res.json({
            data : member, authData
        })
    })
})

router.put("/member_achievement/:id_member", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/member_achievement/" + req.params.id_member, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Member.update({
                nama_member : req.body.nama_member,
                jurusan : req.body.jurusan,
                id_achievement : req.body.id_achievement
            }, {
                where : { id_member: req.params.id_member },
                returning : true,
                plain : true
            }).then(affectedRow => {
                return Member.findOne({where: {id_member: req.params.id_member}})      
            }).then(b => {
                res.json({
                    "status" : "success",
                    "message" : "data updated",
                    "data" : b,
                    authData
                })
            })
        }
    })
})

router.delete("/member_achievement/:id_member", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/member_achievement/" + req.params.id_member, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Member.destroy({where: {id_member: req.params.id_member}}).then(member => {
                res.json({msg : "data deleted", authData})
            })
        }
    })
})

module.exports = router