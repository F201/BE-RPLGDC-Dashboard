const express = require('express')
const Products = require('../models/products')
const Pivot = require('../models/pivot_product_tools')
const router = express.Router()
const upload = require('../middleware/uploadProducts')
const request = require('request')
const connection = require('../conn')


router.get('/products/:id_products', (req, res) => {
    connection.query(
        'SELECT products.id_products, nama_products, gambar_products, kategori_products, deskripsi, nama_tools, gambar_tools FROM products JOIN pivot_product_tools USING(id_products) JOIN tools USING (id_tools) WHERE products.id_products = id_products FOR JSON AUTO', req.params.id_products, (err, results, fields) => {
            if(err) {
                throw err
            } else {
                res.json({
                    "data": results,
                    "msg" : "GET success"
                })
            }
        }
    )
})

// router.get('/detail_products', (req, res) => {
//     connection.query(
//         'SELECT products.id_products, nama_products, gambar_products, kategori_products, deskripsi, nama_tools, gambar_tools FROM products JOIN pivot_product_tools USING(id_products) JOIN tools USING (id_tools)'
//         , (err, results) => {
//             if(err) {
//                 throw err
//             } else {
//                 const newResult = {}
//                 results.map(row => {
//                     newResult[row.id_products] = {
//                             id_products: row.id_products,
//                             nama_products: row.nama_products,
//                             gambar_products: row.gambar_products,
//                             deskripsi: row.deskripsi,
//                             tools: row.id_products.forEach(tool => {
//                                 tool.nama_tools, tool.gambar_tools
//                             }
//                             )}   
//                 });
//                 // let data = results
//                 // const newResult = results.map(row => {
//                 //     return Object.assign(
//                 //         {},
//                 //         {
//                 //             id_products: row.id_products,
//                 //             nama_products: row.nama_products,
//                 //             gambar_products: row.gambar_products,
//                 //             deskripsi: row.deskripsi,
//                 //             tools: row.map(tool => {
//                 //                 return Object.assign(
//                 //                     {},
//                 //                     {
//                 //                         nama_tools: tool.nama_tools,
//                 //                         gambar_tools: tool.gambar_tools
//                 //                     }
//                 //                 )
//                 //             })
//                 //         }
//                 //     )
//                     // if(row.id_products) {
//                     //     newResult[row.id_products].products.push(row.nama_tools, row.gambar_tools)
//                     // } else {
//                         // newResult[row.id_products] = {
//                         //     id_products: row.id_products,
//                         //     nama_products: row.nama_products,
//                         //     gambar_products: row.gambar_products,
//                         //     deskripsi: row.deskripsi,
//                         //     tools: {
//                         //         nama_tools: row.nama_tools,
//                         //         gambar_tools: row.gambar_tools
//                         //     }
//                         // }
//                     // }
                    
//                 // })
//                 res.json({newResult})
//                 // res.json({
//                 //     "data": results,
//                 //     "msg" : "GET success"
//                 // })
//             }
//         }
//     )
// })

router.get('/detail_products', (req, res) => {
    connection.query(
        'SELECT * FROM products', (err, product_results) => {
            if(err) {
                throw err
            } else {
                // res.json(product_results[0].nama_products);
                var data_product = {product : product_results}
                for (var i=0; i < product_results.length; i++) {
                    data_product.product[i]['tools'] = {}
                    connection.query('SELECT nama_tools, gambar_tools FROM tools JOIN pivot_product_tools USING (id_tools) WHERE id_products = ?', [product_results[i].id_products], (error, results) => {
                        if (error) {
                            throw error
                        } else {
                            data_product.product[i].tools = results
                            console.log(data_product)
                            console.log(results.RowDataPacket)
                        }
                    })
                }
                
                res.json(data_product);
            }
        }
    )
})
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