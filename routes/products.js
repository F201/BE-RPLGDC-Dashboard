const express = require('express')
const Products = require('../models/products')
const router = express.Router()
const { fileDir, upload } = require('../middleware/uploadProducts')
const connection = require('../conn')
const request = require('request')
const uploadFile = require('../middleware/uploadFile')


router.get('/detail_products/:id_products', (req, res) => {
    connection.query(
        'SELECT * FROM products where id_products = ?', [req.params.id_products], (err, product_results) => {
            if(err) {
                throw err
            } else {
                let data_product = {product : []}

                product_results.forEach(async (element, index) => {
                    const tools = await getToolsById(element.id_products).catch(result => {
                        res.status(500).json(result)
                    })

                    data_product.product.push({
                        id_products: element.id_products,
                        nama_products: element.nama_products,
                        gambar_products: element.gambar_products,
                        category_products: element.category_products,
                        deskripsi: element.deskripsi,
                        tools: tools
                    })

                    if (product_results.length === index + 1) {
                        res.status(200).json(data_product)
                    }
                });
            }
        }
    )
})

router.get('/detail_products', (req, res) => {
    connection.query(
        'SELECT * FROM products', (err, product_results) => {
            if(err) {
                throw err
            } else {
                let data_product = {product : []}

                product_results.forEach(async (element, index) => {
                    const tools = await getToolsById(element.id_products).catch(result => {
                        res.status(500).json(result)
                    })

                    data_product.product.push({
                        id_products: element.id_products,
                        nama_products: element.nama_products,
                        gambar_products: element.gambar_products,
                        category_products: element.category_products,
                        deskripsi: element.deskripsi,
                        tools: tools
                    })

                    if (product_results.length === index + 1) {
                        res.status(200).json(data_product)
                    }
                });
            }
        }
    )
})
const getToolsById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT nama_tools, gambar_tools FROM tools JOIN pivot_product_tools USING (id_tools) WHERE id_products = ?', [id], (error, results) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(results)
            }
        })
    })
}
router.get("/products", (req, res) => {
    Products.findAll().then(product => {
        res.json({
            "data": product,
            "msg" : "GET success"
        })
    })
})

router.get("/products/:products_id", (req, res) => {
    Products.findOne({
        where: { id_products : req.params.products_id }
    }).then(products => {
        if (!products) {
            return res.json({"msg": "data not found"})
        }
        res.json({data: products})
    })
})

router.post('/products', upload.single('gambar_products'), async (req, res) => {
    let fileData = await uploadFile.single(fileDir, req.file)
    Products.create({
        nama_products : req.body.nama_products,
        gambar_products : fileData.gambar_products === undefined ? "" : fileData.gambar_products,
        deskripsi : req.body.deskripsi
    }).then(products => {
        res.json({
            "data" : products,
            "msg" : "POST success"
        })
    })
})

router.put("/products/:id_products", upload.single('gambar_products'), (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/products/"+req.params.id_products, { json: true }, async (err, res2, body) => {
        if (err) { return console.log(err) }
        let fileData = await uploadFile.single(fileDir, req.file)
        let fs = require('fs')
        let path = require('path')
        let appDir = path.dirname(require.main.filename)
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            const x = {
                nama_products: req.body.nama_products,
                gambar_products: fileData.gambar_products === undefined ? "" : fileData.gambar_products,
                kategori_products: req.body.kategori_products,
                deskripsi: req.body.deskripsi
            }
            fs.unlink(appDir + "/public/images/products/" + body.data.gambar_products, function(err) {
                Products.update(x, {
                    where : {
                        id_products: req.params.id_products
                    },
                    returning: true,
                    plain: true
                }).then(affectedRow => {
                    return Products.findOne({where: {id_products: req.params.id_products}})      
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
})

router.delete("/products/:id_products", (req, res) => {
    request(req.protocol+"://"+req.headers.host+"/products/"+req.params.id_products, { json: true }, (err, res2, body) => {
        if (err) { return console.log(err) }
        if (body.data == undefined) {
            res.json({"msg": "data not found"})
        } else {
            let fs = require('fs')
            let path = require('path')
            let appDir = path.dirname(require.main.filename)
            fs.unlink(appDir + "/public/images/products/" + body.data.gambar_products, function(err) {
                Products.destroy({
                    where: {
                        id_products: req.params.id_products
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