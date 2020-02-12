const express = require('express')
const Achievements = require('../models/achievements')
const router  = express.Router()
const { fileDir, upload }  = require('../middleware/uploadAchievements')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')
const pool = require('../conn')
const jwt = require('jsonwebtoken')

const getMembersById = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query('SELECT id_member, nama_member, jurusan FROM member_achievement WHERE id_achievement = ?', [id], (error, results) => {
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

router.get("/detail_achievement", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM achievements", (error, results) => {
            connection.release();
            if (error) {
                throw error
            } else {
                let data_achievement = {achievement : []}
                
                results.forEach(async (data, index) => {
                    const members = await getMembersById(data.id_achievement).catch(result => {
                        res.status(500).json(result)
                    })

                    data_achievement.achievement.push({
                        id_achievement: data.id_achievement,
                        judul: data.judul,
                        tahun: data.tahun,
                        peringkat: data.peringkat,
                        foto_achievement: data.foto_achievement,
                        members: members
                    })

                    if (results.length === index + 1) {
                        res.status(200).json(data_achievement)
                    }
                });
            }
        })
    })
})

router.get("/detail_achievement/:id_achievement", (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM achievements WHERE id_achievement = ?", [req.params.id_achievement], (error, results) => {
            connection.release();
            if (error) {
                throw error
            } else {
                let data_achievement = {achievement : []}
                
                results.forEach(async (data, index) => {
                    const members = await getMembersById(data.id_achievement).catch(result => {
                        res.status(500).json(result)
                    })

                    data_achievement.achievement.push({
                        id_achievement: data.id_achievement,
                        judul: data.judul,
                        tahun: data.tahun,
                        peringkat: data.peringkat,
                        foto_achievement: data.foto_achievement,
                        members: members
                    })

                    if (results.length === index + 1) {
                        res.status(200).json(data_achievement)
                    }
                });
            }
        })
    })
})

router.get("/achievements", (req, res) => {
    Achievements.findAll().then(achievements => {
        res.json({data: achievements})
    })
})

router.get("/achievements/:id_achievement", (req, res) => {
    Achievements.findOne({
        where : {id_achievement : req.params.id_achievement}
    }).then(achievements => {
        if (!achievements) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: achievements})
    })
})

router.post("/achievements", upload.single('foto_achievement'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(403)
    }
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE,async (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            let fileData = await uploadFile.single(fileDir, req.file)
            console.log('file',fileData)
            Achievements.create({
                judul: req.body.judul,
                tahun: req.body.tahun,
                peringkat: req.body.peringkat,
                foto_achievement: fileData.foto_achievement === undefined ? "" : fileData.foto_achievement
            }).then(achievements => {
                res.json({
                    "data": achievements,
                    authData
                })
            })
        }
    })
})

router.put("/achievements/:id_achievement", upload.single('foto_achievement'), (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (!req.file) {
                request(req.protocol+"://"+req.headers.host+"/achievements/"+req.params.id_achievement, { json: true }, (err, res2, body) => {
                    if (err) { return console.log(err) }
                    if (body.data == undefined) {
                        res.json({"msg": "data not found"})
                    } else {
                        const x = {
                            judul: req.body.judul,
                            tahun: req.body.tahun,
                            peringkat: req.body.peringkat
                        }
                        Achievements.update(x, {
                            where : {
                                id_achievement: req.params.id_achievement
                            },
                            returning: true,
                            plain: true
                        }).then(affectedRow => {
                            return Achievements.findOne({where: {id_achievement: req.params.id_achievement}})      
                        }).then(b => {
                            res.json({
                                "status": "success",
                                "message": "data updated",
                                "data": b,
                                authData
                            })
                        })
                    }
                })
            } else {
                request(req.protocol+"://"+req.headers.host+"/achievements/"+req.params.id_achievement, { json: true }, async(err, res2, body) => {
                    if (err) { return console.log(err) }
                    let fileData = await uploadFile.single(fileDir, req.file)
                    let fs = require('fs')
                    let path = require('path')
                    let appDir = path.dirname(require.main.filename)
                    if (body.data == undefined) {
                        fs.unlink(appDir + "/public/images/achievements/" + req.file.filename)
                        res.json({"msg": "data not found"})
                    } else {
                        const x = {
                            judul: req.body.judul,
                            tahun: req.body.tahun,
                            peringkat: req.body.peringkat,
                            foto_achievement: data.foto_achievement === undefined ? "" : data.foto_achievement
                        }
                        fs.unlink(appDir + "/public/images/achievements/" + body.data.foto_achievement, function(err) {
                            Achievements.update(x, {
                                where : {
                                    id_achievement: req.params.id_achievement
                                },
                                returning: true,
                                plain: true
                            }).then(affectedRow => {
                                return Achievements.findOne({where: {id_achievement: req.params.id_achievement}})      
                            }).then(b => {
                                res.json({
                                    "status": "success",
                                    "message": "data updated",
                                    "data": b,
                                    authData
                                })
                            })
                        })
                    }
                })
            }
        }
    })
})

router.delete("/achievements/:id_achievement", (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_AUTH_CODE, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            request(req.protocol+"://"+req.headers.host+"/achievements/"+req.params.id_achievement, { json: true }, (err, res2, body) => {
                if (err) { return console.log(err) }
                if (body.data == undefined) {
                    res.json({"msg": "data not found"})
                } else {
                    let fs = require('fs')
                    let path = require('path')
                    let appDir = path.dirname(require.main.filename)
                    fs.unlink(appDir + "/public/images/achievements/" + body.data.foto_achievement, function(err) {
                        Achievements.destroy({
                            where: {
                                id_achievement: req.params.id_achievement
                            }
                        }).then(menu => {
                            res.json({
                                "msg": "data deleted"
                            })
                        })
                    })
                }
            })
        }
    })
})

module.exports = router