const express = require('express')
const Recruitment = require('../models/recruitment')
const router  = express.Router()
const upload  = require('../middleware/uploadRecuitment')
const request = require('request')

// router.get("/recruitment", (req, res) => {
//     Recruitment.
// })

var cpUpload = upload.fields([{ name: 'foto_profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }, { name: 'motivation_letter', maxCount: 1 }])

router.post("/recruitment", cpUpload, (req, res) => {
    console.log(req.files['foto_profile'][0])
    Recruitment.create({
        foto_profile: req.files === undefined ? "" : req.files['foto_profile'][0].filename,
        nama_lengkap: req.body.nama_lengkap,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan,
        divisi: req.body.divisi,
        cv: req.files === undefined ? "" : req.files['cv'][0].filename,
        motivation_letter: req.files === undefined ? "" : req.files['motivation_letter'][0].filename,
        portofolio: req.body.portofolio 
    }).then(recruitment => {
        res.json({
            "data": recruitment
        })
    })
})

router.get("/recruitment", (req, res) => {
    Recruitment.findAll().then(recruitment => {
        res.json({data: recruitment})
    })
})

router.get("/recruitment/:id_recruitment", (req, res) =>{
    Recruitment.findOne({
        where: { id_recruitment : req.paramss.id_recruitment }
    }).then(recruitment => {
        if (!recruitment) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: recruitment})
    })
})



module.exports = router