const express = require('express')
const Recruitment = require('../models/recruitment')
const router  = express.Router()
const upload  = require('../middleware/uploadRecuitment')
const request = require('request')
const mysql = require('mysql');

const connection = require('../conn')
// router.get("/recruitment", (req, res) => {
//     Recruitment.
// })

var cpUpload = upload.fields([{ name: 'foto_profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }, { name: 'motivation_letter', maxCount: 1 }])

// post data registrasi
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
        portofolio: req.body.portofolio,
        status1: req.body.status1,
        status2: req.body.status2
    }).then(recruitment => {
        res.json({
            "data": recruitment
        })
    })
})

// tampilin semua data orang yang daftar
router.get("/recruitment", (req, res) => {
    Recruitment.findAll().then(recruitment => {
        res.json({data: recruitment})
    })
})

// tampilin data orang yang dicari berdasarkan id
router.get("/recruitment/:id_recruitment", (req, res) => {
    Recruitment.findOne({
        where: { id_recruitment : req.params.id_recruitment }
    }).then(recruitment => {
        if (!recruitment) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: recruitment})
    })
})

// router.get("/reqruitment/:status1/:status2", (req, res) => {
//     Recruitment.findAll({
//         where: { status1 : 1 }
//     })
// })

// tampilin orang yang lulus seleksi 1 dan 2
router.get('/recruitment/lulus/:status1/:status2', (req, res) => {
    connection.query("SELECT * FROM recuitment WHERE status1='1' AND status2='1';",[req.params.status1, req.params.status2], function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: recruitment})
        // console.log(JSON.stringify(results))
        }
    });
});

// mengubah value status1 (meluluskan seleksi1)
router.put('/recruitment/grade1/:id_recruitment', (req, res) => {
    connection.query("UPDATE recruitment SET status1='1' WHERE id_recruitment=?",[req.params.id_recruitment], function(error, results, fields){
        if(error) throw error;
        // else {
        //     res.json({data: recruitment})
        // }
    })
})

// // mengubah status 2 menjadi lulus (value 1) yang sebelumnya telah lulus di seleksi 1
// router.put('/recruitment/grade2/:id_recruitment/:status1', (req, res) => {
//     connection.query("UPDATE recruitment SET status2='1' WHERE id_recruitment='id_recruitment;'", [req.params.id_recruitment], function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })

// // mendapatkan total yang lulus seleksi 1 dan seleksi 2
// router.get('/recruitment/sumpass', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment;", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })

// // mendapatkan total yang lulus seleksi 1 dan seleksi 2 dimana divisi=frontend
// router.get('/recruitment/sumpass/frontend', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi='frontend';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan total yang lulus seleksi 1 dan seleksi 2 dimana divisi=backend
// router.get('/recruitment/sumpass/backend', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi='backend';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan total yang lulus seleksi 1 dan seleksi 2 dimana divisi=uiux
// router.get('/recruitment/sumpass/uiux', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi='uiux';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan total yang lulus seleksi 1 dan seleksi 2 dimana divisi=gdc
// router.get('/recruitment/sumpass/gdc', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi='gdc';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan total yang lulus seleksi 1 dan seleksi 2 dimana divisi=mobile
// router.get('/recruitment/sumpass/mobile', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi='mobile';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })

// // mendapatkan data orang orang yang lulus dimana divisi=frontend
// router.get('/recruitment/datapass/frontend', (req, res) => {
//     connection.query("SELECT * FROM recruitment WHERE divisi='frontend';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan data orang orang yang lulus dimana divisi=backend
// router.get('/recruitment/datapass/backend', (req, res) => {
//     connection.query("SELECT * FROM recruitment WHERE divisi='backend';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan data orang orang yang lulus dimana divisi=uiux
// router.get('/recruitment/datapass/uiux', (req, res) => {
//     connection.query("SELECT * FROM recruitment WHERE divisi='uiux';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan data orang orang yang lulus dimana divisi=gdc
// router.get('/recruitment/datapass/gdc', (req, res) => {
//     connection.query("SELECT * FROM recruitment WHERE divisi='gdc';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })
// // mendapatkan data orang orang yang lulus dimana divisi=mobile
// router.get('/recruitment/datapass/mobile', (req, res) => {
//     connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi='mobile';", function(error, results, fields){
//         if(error) throw error;
//         else {
//             res.json({data: recruitment})
//         }
//     })
// })

module.exports = router