const express = require('express')
const Activities = require('../models/activities')
const router  = express.Router()
const {fileDir, upload}  = require('../middleware/uploadActivities')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')
const pool = require('../conn')

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

router.get("/activities", (req, res) => {
    Activities.findAll().then(activities => {
        res.json({data: activities})
    })
})

router.get("/detail_activities", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query('SELECT * FROM activities',async (error, activity_results) => {
            connection.release();
            if (error) {
                res.json({status: error})
            } else {
                let data_activities = {activities : []}
                
                await asyncForEach(activity_results, async (data) => {
                    const divisions = await getDivisionById(data.id_activities, res).catch(result => {
                        res.status(500).json(result)
                    })
                    
                    data_activities.activities.push({
                        id_activities: data.id_activities,
                        nama_activities: data.nama_activities,
                        gambar_activities: data.gambar_activities,
                        tanggal: data.tanggal,
                        deskripsi: data.deskripsi,
                        divisions: divisions
                    })
                });
                res.status(200).json(data_activities)
            }
        })
    })
})

router.get("/detail_activities/:id_activities", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) res.json({status: err});
        connection.query("SELECT * FROM activities WHERE id_activities = ?", [req.params.id_activities], async (error, results) => {
            connection.release();
            if (error) {
                res.json({status: error})
            } else {
                let data_activities = {activities : []}
                
                await asyncForEach(results, async (data) => {
                    const divisions = await getDivisionById(data.id_activities, res).catch(result => {
                        res.status(500).json(result)
                    })

                    data_activities.activities.push({
                        id_activities: data.id_activities,
                        nama_activities: data.nama_activities,
                        gambar_activities: data.gambar_activities,
                        tanggal: data.tanggal,
                        deskripsi: data.deskripsi,
                        divisions: divisions
                    })
                });
                res.status(200).json(data_activities)
            }
        })
    })
})

const getDivisionById = (id, res) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) res.json({status: err});
            connection.query('SELECT idx, id_divisi, nama_divisi, gambar_divisi FROM divisions JOIN pivot_division_activities USING (id_divisi) WHERE id_activities= ?', [id], (error, results) => {
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

router.get("/activities/:id_activities", (req, res) => {
    Activities.findOne({
        where: { id_activities : req.params.id_activities }
    }).then(activities => {
        if (!activities) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: activities})
    })
})

router.post("/activities", upload.single('gambar_activities'), async(req, res) => {
    if (!req.file) {
        return res.sendStatus(403)
    }
    let fileData = await uploadFile.single(fileDir, req.file)
    Activities.create({
        nama_activities: req.body.nama_activities,
        tanggal: req.body.tanggal,
        deskripsi: req.body.deskripsi,
        gambar_activities: fileData.gambar_activities === undefined ? "" : fileData.gambar_activities
    }).then(activities => {
        res.json({
            "data": activities
        })
    })
})

router.put("/activities/:id_activities", upload.single('gambar_activities'), (req, res) => {
    if (!req.file) {
        request(req.protocol+"://"+req.headers.host+"/activities/"+req.params.id_activities, { json: true }, (err, res2, body) => {
            if (err) { return console.log(err) }
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    nama_activities: req.body.nama_activities,
                    tanggal: req.body.tanggal,
                    deskripsi: req.body.deskripsi,
                }
                Activities.update(x, {
                    where : {
                        id_activities: req.params.id_activities
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Activities.findOne({where: {id_activities: req.params.id_activities}})      
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
        request(req.protocol+"://"+req.headers.host+"/activities/"+req.params.id_activities, { json: true }, async(err, res2, body) => {
            if (err) { return console.log(err) }
            let fileData = await uploadFile.single(fileDir, req.file)
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            if (body.data == undefined) {
                res.json({"msg": "data not found"})
            } else {
                const x = {
                    nama_activities: req.body.nama_activities,
                    tanggal: req.body.tanggal,
                    deskripsi: req.body.deskripsi,
                    gambar_activities: fileData.gambar_activities === undefined ? "" : fileData.gambar_activities
                }
                fs.unlink(appDir + "/public/images/activities/" + body.data.gambar_activities, function(err) {
                    Activities.update(x, {
                        where : {
                            id_activities: req.params.id_activities
                        },
                        returning: true,
                        plain: true
                    }).then(affectedRow => {
                        return Activities.findOne({where: {id_activities: req.params.id_activities}})      
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

router.delete("/activities/:id_activities", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/activities/"+req.params.id_activities, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/activities/" + body.data.gambar_activities, function(err) {
                Activities.destroy({
                    where: {
                        id_activities: req.params.id_activities
                    }
                }).then(menu => {
                    res.json({
                        "msg": "data deleted"
                    })
                })
            })
        }
    })
})

module.exports = router