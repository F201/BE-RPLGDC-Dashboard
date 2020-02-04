const Sequelize = require('sequelize');
const db = require('../config/config');

const products = db.define('products', {
    'id_products' : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nama_products': Sequelize.STRING,
    'gambar_products': Sequelize.STRING,
    'kategori_products': {
        type: Sequelize.ENUM,
        values: ['web', 'android', 'game', 'UI/UX', 'sound']
    },
    deskripsi: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = products;