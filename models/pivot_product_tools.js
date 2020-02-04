const Sequelize = require('sequelize');
const db = require('../config/config');

const pivot_product_tools = db.define('pivot_product_tools', {
    'idx' : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'id_tools': Sequelize.INTEGER,
    'id_products': Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = pivot_product_tools;