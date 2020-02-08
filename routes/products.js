const express = require('express')
const Products = require('../models/products')
const Pivot = require('../models/pivot_product_tools')
const router = express.Router()
const upload = require('../middleware/uploadProducts')
const request = require('request')
const connection = require('../conn')


router.get('/products/:id_products', (req, res) => {
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
                //res.json(data_product);
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
                // res.json(product_results[0].nama_products);
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
                //res.json(data_product);
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

router.post('/products', upload.single('gambar_products'), (req, res) => {
    Products.create({
        nama_products : req.body.nama_products,
        gambar_products : req.file === undefined ? "" : req.file.filename,
        deskripsi : req.body.deskripsi
    }).then(products => {
        res.json({
            "data" : products,
            "msg" : "POST success"
        })
    })
})

router.post('/pivot', (req, res) => {
    Pivot.create({
        id_products : req.body.id_products,
        id_tools : req.params.id_tools
    }).then(pivot => {
        res.json({
            "data": pivot,
            "msg" : "POST success"
        })
    })
})

module.exports = router