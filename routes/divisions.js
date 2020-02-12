const express = require('express')
const Divisions = require('../models/divisions')
const router = express.Router()
const {fileDir, upload}  = require('../middleware/uploadDivision')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')
const pool = require('../conn')
const jwt = require('jsonwebtoken')

const getToolsById = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) res.json({status: err});
            connection.query('SELECT tools.id_tools, nama_tools, gambar_tools FROM tools JOIN pivot_division_tools USING (id_tools) WHERE id_divisi = ?', [id], (error, results) => {
                connection.release();
                if (error) {
                    return reject(error)
                } else {
                    return resolve(results)
                }
            })
        })
    })
}

const getActivitiesById = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) res.json({status: err});
            connection.query('SELECT activities.id_activities, nama_activities, gambar_activities, tanggal, deskripsi FROM activities JOIN pivot_division_activities USING (id_activities) WHERE id_divisi = ?', [id], (error, results) => {
                connection.release();
                if (error) {
                    return reject(error)
                } else {
                    return resolve(results)
                }
            })
        })
    })
}

router.get("/detail_divisions", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query('SELECT * FROM divisions', (error, division_results) => {
            connection.release();
            if (error) {
                res.json({status: error})
            } else {
                let data_divisions = {division : []}

                division_results.forEach(async (data, index) => {
                    const tools = await getToolsById(data.id_divisi).catch(result => {
                        res.status(500).json(result)
                    })

                    const activities = await getActivitiesById(data.id_divisi).catch(result => {
                        res.status(500).json(result)
                    })

                    data_divisions.division.push({
                        id_divisi: data.id_activities,
                        nama_divisi: data.nama_divisi,
                        gambar_divisi: data.gambar_divisi,
                        deskripsi: data.deskripsi,
                        tools: tools,
                        activities: activities
                    })

                    if(division_results.length === index + 1) {
                        res.status(200).json(data_divisions)
                    }
                });
            }
        })
    })
})

router.get("/detail_divisions/:id_divisi", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query('SELECT * FROM divisions WHERE id_divisi = ?', [req.params.id_divisi], (error, division_results) => {
            connection.release();
            if (error) {
                res.json({status: error})
            } else {
                let data_divisions = {division : []}

                division_results.forEach(async (data, index) => {
                    const tools = await getToolsById(data.id_divisi).catch(result => {
                        res.status(500).json(result)
                    })

                    const activities = await getActivitiesById(data.id_divisi).catch(result => {
                        res.status(500).json(result)
                    })

                    data_divisions.division.push({
                        id_divisi: data.id_activities,
                        nama_divisi: data.nama_divisi,
                        gambar_divisi: data.gambar_divisi,
                        deskripsi: data.deskripsi,
                        tools: tools,
                        activities: activities
                    })

                    if(division_results.length === index + 1) {
                        res.status(200).json(data_divisions)
                    }
                });
            }
        })
    })
})

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

router.post("/divisions", upload.single('gambar_divisi'), async(req, res) => {
    if (!req.file) {
        return res.sendStatus(403)
    }
    let fileData = await uploadFile.single(fileDir, req.file)
    Divisions.create({
        nama_divisi : req.body.nama_divisi,
        gambar_divisi: fileData.gambar_divisi === undefined ? "" : fileData.gambar_divisi,
        deskripsi : req.body.deskripsi
    }).then(division => {
        res.json({data : division})
    })
})

router.put("/divisions/:id_divisi", upload.single('gambar_divisi'), (req, res) => {
    if (!req.file) {
        request(req.protocol + "://" + req.headers.host + "/divisions/" + req.params.id_divisi, { json: true }, (err, res2, body) => {
            if (err) { res.json({status:err}) }
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    nama_divisi : req.body.nama_divisi,
                    deskripsi : req.body.deskripsi
                }
                Divisions.update(x, {
                    where : {
                        id_divisi: req.params.id_divisi
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Divisions.findOne({where: {id_divisi: req.params.id_divisi}})      
                }).then(b => {
                    res.json({
                        "status": "success",
                        "message": "data updated",
                        "data": b
                    })
                })
            }
        })
    } else {
        request(req.protocol + "://" + req.headers.host + "/divisions/" + req.params.id_divisi, { json: true }, async (err, res2, body) => {
            if (err) { return console.log(err) }
            let fileData = await uploadFile.single(fileDir, req.file)
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    nama_divisi : req.body.nama_divisi,
                    gambar_divisi: fileData.gambar_divisi === undefined ? "" : fileData.gambar_divisi,
                    deskripsi : req.body.deskripsi
                }
                fs.unlink(appDir + "/public/images/division/" + body.data.gambar_divisi, function(err) {
                    Divisions.update(x, {
                        where : {
                            id_divisi: req.params.id_divisi
                        },
                        returning: true,
                        plain: true
                    }).then(affectedRow => {
                        return Divisions.findOne({where: {id_divisi: req.params.id_divisi}})      
                    }).then(b => {
                        res.json({
                            "status": "success",
                            "message": "data updated",
                            "data": b
                        })
                    })
                })
            }
        })
    }
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