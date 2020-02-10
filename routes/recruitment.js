const express = require('express')
const Recruitment = require('../models/recruitment')
const router  = express.Router()
const {fileDir, upload}  = require('../middleware/uploadRecruitment')
const uploadFile = require('../middleware/uploadFile')
const request = require('request')
// const mysql = require('mysql');
const connection = require('../conn')
// router.get("/recruitment", (req, res) => {
//     Recruitment.
// })

var cpUpload = upload.fields([{ name: 'foto_profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }, { name: 'motivation_letter', maxCount: 1 }])

// post data registrasi
router.post("/recruitment/post", cpUpload, async(req, res) => {
    // console.log(req.files['foto_profile'][0].originalname)
    let fileData = await uploadFile.multi(fileDir, req.files)
    Recruitment.create({
        foto_profile: fileData.foto_profile === undefined ? "" : fileData.foto_profile,
        nim: req.body.nim,
        nama_lengkap: req.body.nama_lengkap,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan,
        divisi: req.body.divisi,
        cv: fileData.cv === undefined ? "" : fileData.cv['cv'][0],
        motivation_letter: fileData.motivation_letter === undefined ? "" : fileData.motivation_letter['motivation_letter'][0],
        portofolio: req.body.portofolio
    }).then(recruitment => {
        res.json({
            "data": recruitment
        })
    })
})

// tampilin semua data orang yang daftar
router.get("/recruitment/findall", (req, res) => {
    Recruitment.findAll().then(recruitment => {
        if (!recruitment) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: recruitment})
    })
})
// coba select all dengan connection.query
// router.get('/cobapanggil', (req, res) => {
//     connection.query('SELECT * FROM recruitment', function(error, results, fields){
//         if (error) throw error
//         else {
//             res.json({data: results})
//         // console.log(JSON.stringify(results))
//         }
//     })
// })

// tampilin semua data orang yang daftar berdasarkan divisi
router.get("/recruitment/findallbydivision/:divisi", (req, res) => {
    Recruitment.findAll({
        where: { divisi : req.params.divisi}
    }).then(recruitment => {
        if (!recruitment) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: recruitment})
    })
})

// tampilin data orang yang dicari berdasarkan id
router.get("/recruitment/findbyid/:id_recruitment", (req, res) => {
    Recruitment.findOne({
        where: { id_recruitment : req.params.id_recruitment }
    }).then(recruitment => {
        if (!recruitment) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: recruitment})
    })
})
// tampilin data orang yang dicari berdasarkan nim
router.get("/recruitment/findbynim/:nim", (req, res) => {
    Recruitment.findOne({
        where: { nim : req.params.nim }
    }).then(recruitment => {
        if (!recruitment) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: {recruitment}})
        // buat objek
    })
})


router.get("/reqruitment/:status1/:status2", (req, res) => {
    Recruitment.findAll({
        where: { status1 : 1 }
    })
})

// mengubah value status1 (meluluskan seleksi1)
router.put('/recruitment/grade1/:id_recruitment', (req, res) => {
    connection.query(" UPDATE recruitment SET status1 = '1' WHERE id_recruitment = ? ", [req.params.id_recruitment], function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: results})
        }
        console.log(results.affectedRows + " record(s) updated")
    })
})

// mengubah value status1 (meluluskan seleksi2) yang sebelumnya telah lulus di seleksi 1
router.put('/recruitment/grade2/:id_recruitment', (req, res) => {
    connection.query("UPDATE recruitment SET status2='1' WHERE id_recruitment= ? AND status1='1'", [req.params.id_recruitment], function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: results})
        }
        console.log(results.affectedRows + " record(s) updated")
    })
})

// mendapatkan total yang lulus seleksi 1 
router.get('/recruitment/sumpass1', (req, res) => {
    connection.query("SELECT COUNT(*) FROM recruitment WHERE status1=1", function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: results})
        }
    })
})
// mendapatkan semua data yang lulus seleksi 1
router.get('/recruitment/datapass1', (req, res) => {
    connection.query("SELECT * FROM recruitment WHERE status1=1 ", function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: results})
        }
    });
});

// mendapatkan total yang lulus seleksi 1 dan seleksi 2
router.get('/recruitment/sumpass2', (req, res) => {
    connection.query("SELECT COUNT(*) as pass_member FROM recruitment WHERE status1='1' AND status2='1'", function(error, results){
        if(error) throw error;
        else {
            res.json({data: results})
        }
    })
})
// mendapatkan semua data yang lulus seleksi 1 dan seleksi 2
router.get('/recruitment/datapass2', (req, res) => {
    connection.query("SELECT * FROM recruitment WHERE status1=1 AND status2=1", function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: results})
        }
    });
});

// mendapatkan total yang lulus seleksi 1 dan seleksi 2 berdasarkan divisi
router.get('/recruitment/sumpass2/:divisi', (req, res) => {
    connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi=? AND status1='1' AND status2='1'", [req.params.divisi],function(error, results, fields){
        if(error) throw error;
        else {
            res.json({data: results})
        }
    })
})

// mendapatkan data orang orang yang lulus berdasarkan divisi
router.get('/recruitment/datapass2/:divisi', (req, res) => {
    connection.query("SELECT * FROM recruitment WHERE divisi=? AND status1='1' AND status2='1'", [req.params.divisi], function(error, results){
        if(error) throw error;
        else {
            res.json({data: results})
        }
    })
})

module.exports = router