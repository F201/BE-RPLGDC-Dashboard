const express = require('express')
const Divisions = require('../models/divisions')
const router = express.Router()
const request = require('request')
const connection = require('../conn')

const getToolsById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT tools.id_tools, nama_tools, gambar_tools FROM tools JOIN pivot_division_tools USING (id_tools) WHERE id_divisi = ?', [id], (error, results) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(results)
            }
        })
    })
}

const getActivitiesById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT activities.id_activities, nama_activities, gambar_activities, tanggal, deskripsi FROM activities JOIN pivot_division_activities USING (id_activities) WHERE id_divisi = ?', [id], (error, results) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(results)
            }
        })
    })
}

router.get("/detail_divisions", (req, res) => {
    connection.query('SELECT * FROM divisions', (err, division_results) => {
        if (err) {
            throw err
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

router.get("/detail_divisions/:id_divisi", (req, res) => {
    connection.query('SELECT * FROM divisions WHERE id_divisi = ?', [req.params.id_divisi], (err, division_results) => {
        if (err) {
            throw err
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

router.post("/divisions", (req, res) => {
    Divisions.create({
        nama_divisi : req.body.nama_divisi,
        deskripsi : req.body.deskripsi
    }).then(division => {
        res.json({data : division})
    })
})

router.put("/divisions/:id_divisi", (req, res) => {
    request(req.protocol + "://" + req.headers.host + "/divisions/" + req.params.id_divisi, { json: true }, (err, res2, body) => {
        if (body.data == undefined) {
            res.json({msg : "data not found"})
        } else {
            Divisions.update({
                nama_divisi : req.body.nama_divisi,
                deskripsi : req.body.deskripsi
            }, {
                where : { id_divisi: req.params.id_divisi },
                returning : true,
                plain : true
            }).then(affectedRow => {
                return Divisions.findOne({where: {id_divisi: req.params.id_divisi}})      
            }).then(b => {
                res.json({
                    "status" : "success",
                    "message" : "data updated",
                    "data" : b
                })
            })
        }
    })
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