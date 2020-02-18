const express = require('express')
const Recruitment = require('../models/recruitment')
const router  = express.Router()
// const excelConfig = require('../middleware/excel')
const {fileDir, upload}  = require('../middleware/uploadRecruitment')
const uploadFile = require('../middleware/uploadFile')
const request = require('request')
const pool = require('../conn')

const excel = require('excel4node')
const workbook = new excel.Workbook()
const worksheet = workbook.addWorksheet('Sheet 1')
const header = workbook.createStyle({
    font: {
      color: 'white',
      size: 14,
      align: 'center',
      bold: true
    },
    fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: 'black',
        fgColor: 'black'
    },
    alignment: {
        horizontal: 'center'
    }
    // numberFormat: '$#,##0.00; ($#,##0.00); -',
  });
const column = workbook.createStyle({
    font: {
      color: 'black',
      size: 12,
    }
    // numberFormat: '$#,##0.00; ($#,##0.00); -',
  });

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

router.get('/recruitment/exportpass1', (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/recruitment/datapass1", { json: true }, async (err, res2, body) => {
        if (err) { return res.json({"msg" : err}) }
        worksheet.cell(1,1).string('Nama').style(header)
        worksheet.cell(1,2).string('NIM').style(header)
        worksheet.cell(1,3).string('Divisi').style(header)
        worksheet.cell(1,4).string('Jurusan').style(header)
        worksheet.cell(1,5).string('Angkatan').style(header)
        await asyncForEach(body.data, async (element, index) => {
            worksheet.cell(index+2,1).string(element.nama_lengkap).style(column)
            worksheet.cell(index+2,2).string(element.nim).style(column)
            worksheet.cell(index+2,3).string(element.divisi).style(column)
            worksheet.cell(index+2,4).string(element.jurusan).style(column)
            worksheet.cell(index+2,5).string(element.angkatan).style(column)
        })
        worksheet.row(1).freeze()
        worksheet.row(1).setHeight(30)
        workbook.write('data_recruitment_pass1.xlsx', res)
    })
})

router.get('/recruitment/exportpass2', (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/recruitment/datapass2", { json: true }, async (err, res2, body) => {
        if (err) { return res.json({"msg" : err}) }
        worksheet.cell(1,1).string('Nama').style(header)
        worksheet.cell(1,2).string('NIM').style(header)
        worksheet.cell(1,3).string('Divisi').style(header)
        worksheet.cell(1,4).string('Jurusan').style(header)
        worksheet.cell(1,5).string('Angkatan').style(header)
        await asyncForEach(body.data, async (element, index) => {
            worksheet.cell(index+2,1).string(element.nama_lengkap).style(column)
            worksheet.cell(index+2,2).string(element.nim).style(column)
            worksheet.cell(index+2,3).string(element.divisi).style(column)
            worksheet.cell(index+2,4).string(element.jurusan).style(column)
            worksheet.cell(index+2,5).string(element.angkatan).style(column)
        })
        worksheet.row(1).freeze()
        worksheet.row(1).setHeight(30)
        workbook.write('data_recruitment_pass1.xlsx', res)
    })
})

var cpUpload = upload.fields([{ name: 'foto_profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }, { name: 'motivation_letter', maxCount: 1 }])

// post data registrasi
router.post("/recruitment/", cpUpload, async(req, res) => {
    console.log(Object.keys(req.files))
    if (!Object.keys(req.files).includes('foto_profile') || !Object.keys(req.files).includes('cv') || !Object.keys(req.files).includes('motivation_letter')) {
        return res.sendStatus(403)
    }
    let fileData = await uploadFile.multi(`${fileDir}${req.body.nim}/`, req.files)
    console.log(fileData)
    if (Object.keys(fileData).length === 0) return res.json({status: 'error', msg: 'cannot upoload file'})
    Recruitment.create({
        foto_profile: fileData.foto_profile === undefined ? "" : fileData.foto_profile,
        nim: req.body.nim,
        nama_lengkap: req.body.nama_lengkap,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan,
        divisi: req.body.divisi,
        cv: fileData.cv === undefined ? "" : fileData.cv,
        motivation_letter: fileData.motivation_letter === undefined ? "" : fileData.motivation_letter,
        portofolio: req.body.portofolio
    }).then(recruitment => {
        res.json({
            "data": recruitment
        })
    })
})

// tampilin semua data orang yang daftar
router.get("/recruitment/", (req, res) => {
    let whereCon= {};
    if (req.query.status1) {
        whereCon.status1 = req.query.status1
    }
    if (req.query.status2) {
        whereCon.status2 = req.query.status2
    }
    if (req.query.div) {
        whereCon.division = req.query.div
    }
    Recruitment.findAll({
        where: whereCon
    }).then(recruitment => {
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
// router.get("/recruitment/findallbydivision/:divisi", (req, res) => {
//     Recruitment.findAll({
//         where: { divisi : req.params.divisi}
//     }).then(recruitment => {
//         if (!recruitment) {
//             return res.json({"msg": "data not found"})
//         }
//         res.json({data: recruitment})
//     })
// })

// tampilin data orang yang dicari berdasarkan id
router.get("/recruitment/detail/:id_recruitment", (req, res) => {
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
router.get("/recruitment/checkstatus/:nim", (req, res) => {
    Recruitment.findOne({
        where: { nim : req.params.nim }
    }).then(recruitment => {
        if (!recruitment) {
            return res.json({
                "msg": "data not found",
                "status": "error"
            })
        }
        res.json({
            data: (({nim, nama_lengkap, divisi}) => ({nim, nama_lengkap, divisi}))(recruitment),
            "status": "success",
            "msg": "success get data"
        })
        // buat objek
    })
})

// mengubah value status1 (meluluskan seleksi1)
router.put('/recruitment/grade1/:id_recruitment', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query(" UPDATE recruitment SET status1 = '1' WHERE id_recruitment = ? ", [req.params.id_recruitment], function(error, results, fields){
            connection.release();
            if(error) res.json({status: error});
            else {
                res.json({data: results})
            }
            console.log(results.affectedRows + " record(s) updated")
        })
    })
})

// mengubah value status1 (meluluskan seleksi2) yang sebelumnya telah lulus di seleksi 1
router.put('/recruitment/grade2/:id_recruitment', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query("UPDATE recruitment SET status2='1' WHERE id_recruitment= ? AND status1='1'", [req.params.id_recruitment], function(error, results, fields){
            connection.release();
            if(error) res.json({status: error});
            else {
                res.json({data: results})
            }
            console.log(results.affectedRows + " record(s) updated")
        })
    })
})

router.put('/recruitment/ungrade1/:id_recruitment', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query("UPDATE recruitment SET status1='0' WHERE id_recruitment= ? AND status1='1' AND status2='0'", [req.params.id_recruitment], function(error, results, fields){
            connection.release();
            if(error) res.json({status: error});
            else {
                res.json({data: results})
            }
            console.log(results.affectedRows + " record(s) updated")
        })
    })
})

router.put('/recruitment/ungrade2/:id_recruitment', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query("UPDATE recruitment SET status2='0' WHERE id_recruitment= ? AND status1='1' AND status2='1'", [req.params.id_recruitment], function(error, results, fields){
            connection.release();
            if(error) res.json({status: error});
            else {
                res.json({data: results})
            }
            console.log(results.affectedRows + " record(s) updated")
        })
    })
})

// mendapatkan total yang lulus seleksi 1 
router.get('/recruitment/sumpass1', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query("SELECT COUNT(*) FROM recruitment WHERE status1='1'", function(error, results, fields){
            connection.release();
            if(error) res.json({status:error});
            else {
                res.json({data: results})
            }
            // console.log('hehe')
        })
    })
})
// mendapatkan semua data yang lulus seleksi 1
router.get('/recruitment/datapass1', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({"msg" : err});
        connection.query("SELECT * FROM recruitment WHERE status1=1", function(error, results, fields){
            connection.release();
            if(error) res.json({status : error, msg : 'error'});
            else {
                res.json({data: results})
            }
        });
    })
});

// mendapatkan total yang lulus seleksi 1 dan seleksi 2
router.get('/recruitment/sumpass', (req, res) => {
    let whereCon = {}
    if (req.query.div) {
        whereCon.divisi = req.query.div
    }
    if (req.query.angkatan) {
        whereCon.angkatan = req.query.angkatan
    }
    Recruitment.count({
        where: whereCon,
    }).then(recruitment => {
        if (!recruitment && recruitment !== 0) {
            console.log(recruitment)
            return res.json({"msg": "data not found"})
        }
        res.json({data: {
            count: recruitment
            },
            status: 'success'
        })
    })
})

router.get('/recruitment/sumpass2', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query("SELECT COUNT(*) as pass_member FROM recruitment WHERE status1='1' AND status2='1'", function(error, results){
            connection.release();
            if(error) res.json({status: error, msg : 'error'});
            else {
                res.json({data: results})
            }
        })
    })
})
// mendapatkan semua data yang lulus seleksi 1 dan seleksi 2
router.get('/recruitment/datapass2', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({"msg" : err});
        connection.query("SELECT * FROM recruitment WHERE status1=1 AND status2=1", function(error, results, fields){
            connection.release();
            if(error) res.json({status : error, msg : 'error'});
            else {
                res.json({data: results})
            }
        });
    })
});

// mendapatkan total yang lulus seleksi 1 dan seleksi 2 berdasarkan divisi
// router.get('/recruitment/sumpass2/:divisi', (req, res) => {
//     pool.getConnection(function(err, connection) {
//         if (err) throw err;
//         connection.query("SELECT COUNT(*) FROM recruitment WHERE divisi=? AND status1='1' AND status2='1'", [req.params.divisi],function(error, results, fields){
//             connection.release();
//             if(error) throw error;
//             else {
//                 res.json({data: results})
//             }
//         })
//     })
// })

// mendapatkan data orang orang yang lulus berdasarkan divisi
// router.get('/recruitment/datapass2/:divisi', (req, res) => {
//     pool.getConnection(function(err, connection) {
//         if (err) throw err;
//         connection.query("SELECT * FROM recruitment WHERE divisi=? AND status1='1' AND status2='1'", [req.params.divisi], function(error, results){
//             connection.release();
//             if(error) throw error;
//             else {
//                 res.json({data: results})
//             }
//         })
//     })
// })

module.exports = router