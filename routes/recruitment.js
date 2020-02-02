const express = require('express')
const Recruitment = require('../models/recruitment')
const router  = express.Router()
const upload  = require('../middleware/uploadRecruitment')
const request = require('request')

// router.get("/recruitment", (req, res) => {
//     Recruitment.
// })

router.post("/recruitment", upload.single('foto_profile'), upload.single('cv'), upload.single('motivation_letter'), (req, res) => {
    Recruitment.create({
        foto_profile: request.file === undefined ? "" : req.file.filename,
        nama_lengkap: request.body.nama_lengkap,
        tanggal_lahir: request.body.nama_lengkap,
        tanggal_lahir: request.body.tanggal_lahir,
        jenis_kelamin: request.body.jenis_kelamin,
        jurusan: request.body.jurusan,
        angkatan: request.body.angkatan,
        divisi: request.body.divisi,
        cv: request.file === undefined ? "" : req.file.filename,
        motivation_letter: request.file === undefined ? "" : req.file.filename,
        portofolio: request.body.portofolio 
    }).then(recruitment => {
        res.json({
            "data": recruitment
        })
    })
})

router.get("/")