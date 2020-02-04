const express = require('express')
const Products = require('../models/products')
const Pivot = require('../models/pivot_product_tools')
const Tools = require('../models/tools')
const router = express.Router()
const upload = require('../middleware/uploadProducts')
const request = require('request')

Products.hasMany(Pivot)
Pivot.belongsTo(Products)
Tools.hasMany(Pivot)
Pivot.belongsTo(Tools)

router.get("/products", (req, res) => {
    Products.findAll({
        include: [
            {
                model: Pivot,
                include: [
                    {
                        model: Tools
                    }
                ]
            }
        ]
    }).then(products => {
        res.json({data:products})
        // const resObj = products.map(product => {
        //     return Object.assign({},
        //         {
        //             id_products: product.id_products,
        //             nama_products: product.nama_products,
        //             gambar_products: product.gambar_products,
        //             kategori_products: product.kategori_products,
        //             deskripsi: product.deskripsi,
        //             Pivot: product.Pivot.map(pivot => {
        //                 return Object.assgin({}, {
        //                     idx: pivot.idx,
        //                     Tools: pivot.Tools.map(tool => {
        //                         return Object.assign({}, {
        //                             id_tools: tool.id_tools,
        //                             nama_tools: tool.nama_tools,
        //                             gambar_tools: tool.gambar_tools
        //                         })
        //                     })
        //                 })
        //             })
        //         })
        // });
        // res.json({resObj})
    })
})

module.exports = router