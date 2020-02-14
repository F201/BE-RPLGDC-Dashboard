const express = require('express')
const Highscore = require('../models/highscore')
const router = express.Router()
const request = require('request')

router.get("/score", (req, res) => {
    Highscore.findAll({
        order: [
            ["score", "DESC"]
        ],
        limit: 5
    }).then(highscore => {
        res.json({data: highscore})
    })
})

router.get("/score/:nim", (req, res) => {
    Highscore.findOne({
        where: {
            nim: req.params.nim
        }
    }).then(highscore => {
        if (!highscore) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: highscore})
    })
})

router.post("/score", (req, res) => {
    Highscore.create({
        nim : req.body.nim,
        score : req.body.score
    }).then(highscore => {
        res.json({
            data: highscore,
            status: "POST success"
        })
    })
})

module.exports = router